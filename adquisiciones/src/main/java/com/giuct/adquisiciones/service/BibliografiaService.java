package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.BibliografiaFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IBibliografiaRepository;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service("bibliografias")
public class BibliografiaService extends AdquisicionService{
    private final IBibliografiaRepository bibliografiaRepository;
    private final BibliografiaFactory bibliografiaFactory;

    public BibliografiaService(IFuenteRepository fuenteRepository, FinanciamientoService financiamientoService, ModelMapper modelMapper, IBibliografiaRepository bibliografiaRepository, BibliografiaFactory bibliografiaFactory) {
        super(fuenteRepository, financiamientoService, modelMapper);
        this.bibliografiaRepository = bibliografiaRepository;
        this.bibliografiaFactory = bibliografiaFactory;
    }

    @Override
    public AdquisicionDTO getAdquisicionById(Long id) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findByIdAndBorrado(id, false);
        if(bibliografiaOptional.isPresent()){
            return modelMapper.map(bibliografiaOptional.get(), AdquisicionDTO.class);
        }
        throw new InvalidAdquisicionException("La bibliografia solicitada no existe");
    }


    @Override
    public Page<AdquisicionDTO> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Bibliografia> bibliografiaPage = bibliografiaRepository.findByBorrado(false, PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = bibliografiaPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, bibliografiaPage.getPageable(), bibliografiaPage.getTotalElements());
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Bibliografia> bibliografiaPage = bibliografiaRepository.findByFuenteFinanciamientoAndBorrado(fuenteFinanciamiento, false, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = bibliografiaPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, bibliografiaPage.getPageable(), bibliografiaPage.getTotalElements());
    }

    @Override
    public AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        final FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        final Bibliografia b = bibliografiaFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-b.getCosto());

        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }
        validarFechas(adquisicionDTO.getAnioPublicacion());
        this.fuenteRepository.save(fuenteFinanciamiento);
        bibliografiaRepository.save(b);

        return adquisicionDTO;
    }

    @Override
    public AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        bibliografiaRepository.findByIdAndBorrado(id, false).stream()
                .peek(bibliografia -> {
                    FuenteFinanciamiento fuenteFinanciamiento = bibliografia.getFuenteFinanciamiento();

                    fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + bibliografia.getCosto() - adquisicionDTO.getCosto());

                    if (fuenteFinanciamiento.getMonto() < 0){
                        throw new InvalidAdquisicionException("Fondos insuficientes");
                    }
                    validarFechas(adquisicionDTO.getAnioPublicacion());
                    bibliografia.setAnioPublicacion(adquisicionDTO.getAnioPublicacion());
                    bibliografia.setIssn(adquisicionDTO.getIssn());
                    bibliografia.setIsbn(adquisicionDTO.getIsbn());
                    bibliografia.setTipo(adquisicionDTO.getTipo());
                    bibliografia.setEditorial(adquisicionDTO.getEditorial());
                    bibliografia.setApellidoAutor(adquisicionDTO.getApellidoAutor());
                    bibliografia.setNombreAutor(adquisicionDTO.getNombreAutor());
                    bibliografia.setUrl(adquisicionDTO.getUrl());
                    bibliografia.setTitulo(adquisicionDTO.getTitulo());
                    bibliografia.setCosto(adquisicionDTO.getCosto());
                    bibliografia.setDescripcion(adquisicionDTO.getDescripcion());

                    this.fuenteRepository.save(fuenteFinanciamiento);
                    bibliografiaRepository.save(bibliografia);
                })
                .findFirst()
                .orElseThrow(() -> new InvalidAdquisicionException("La bibliografia que desea modificar no existe"));

        return adquisicionDTO;
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        bibliografiaRepository.findByIdAndBorrado(id, false)
                .stream()
                .peek(bibliografia -> {
                    FuenteFinanciamiento fuenteFinanciamiento = bibliografia.getFuenteFinanciamiento();
                    fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + bibliografia.getCosto());
                    bibliografia.setBorrado(true);
                    bibliografiaRepository.save(bibliografia);
                    fuenteRepository.save(fuenteFinanciamiento);
                })
                .findFirst()
                .orElseThrow(() ->  new InvalidAdquisicionException("La adquisicion no existe"));

    }

    public void validarFechas(LocalDate anioPublicacion){
        if (anioPublicacion.isAfter(LocalDate.now())){
            throw new InvalidAdquisicionException("El año de publicacion no puede ser posterior al año corriente");
        }
    }


}
