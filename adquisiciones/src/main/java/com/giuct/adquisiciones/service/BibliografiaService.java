package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.BibliografiaFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IBibliografiaRepository;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("bibliografias")
@AllArgsConstructor
public class BibliografiaService extends AdquisicionService{
    private final IBibliografiaRepository bibliografiaRepository;
    private final FinanciamientoService financiamientoService;
    private final BibliografiaFactory bibliografiaFactory;
    private final IFuenteRepository fuenteRepository;

    @Override
    public Adquisicion getAdquisicionById(Long id) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);
        if(bibliografiaOptional.isPresent()){
            return bibliografiaOptional.get();
        }
        throw new InvalidAdquisicionException("La bibliografia solicitada no existe");
    }


    @Override
    public Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return bibliografiaRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    @Override
    public Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return bibliografiaRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    @Override
    public AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        final FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        final Bibliografia b = bibliografiaFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-b.getCosto());

        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }

        this.fuenteRepository.save(fuenteFinanciamiento);
        bibliografiaRepository.save(b);

        return adquisicionDTO;
    }

    @Override
    public AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);
        if(bibliografiaOptional.isPresent()){
            Bibliografia b = bibliografiaOptional.get();
            FuenteFinanciamiento fuenteFinanciamiento = b.getFuenteFinanciamiento();

            fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()+b.getCosto()-adquisicionDTO.getCosto());
            if (fuenteFinanciamiento.getMonto() < 0){
                throw new InvalidAdquisicionException("Fondos insuficientes");
            }
            b.setAnioPublicacion(adquisicionDTO.getAnioPublicacion());
            b.setIssn(adquisicionDTO.getIssn());
            b.setIsbn(adquisicionDTO.getIsbn());
            b.setTipo(adquisicionDTO.getTipo());
            b.setEditorial(adquisicionDTO.getEditorial());
            b.setApellidoAutor(adquisicionDTO.getApellidoAutor());
            b.setNombreAutor(adquisicionDTO.getNombreAutor());
            b.setUrl(adquisicionDTO.getUrl());
            b.setTitulo(adquisicionDTO.getTitulo());
            b.setCosto(adquisicionDTO.getCosto());
            b.setDescripcion(adquisicionDTO.getDescripcion());
            this.fuenteRepository.save(fuenteFinanciamiento);
            bibliografiaRepository.save(b);
        } else {
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }

        return adquisicionDTO;
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);

        if (bibliografiaOptional.isEmpty()) {
            throw new InvalidAdquisicionException("La adquisicion no existe");
        }

        Bibliografia bibliografia = bibliografiaOptional.get();
        FuenteFinanciamiento fuenteFinanciamiento = bibliografia.getFuenteFinanciamiento();
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + bibliografia.getCosto());
        bibliografiaRepository.deleteById(id);
        fuenteRepository.save(fuenteFinanciamiento);
    }


}
