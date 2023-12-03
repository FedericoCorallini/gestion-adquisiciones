package com.giuct.adquisiciones.service;


import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.BibliografiaFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IBibliografiaRepository;
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
    public void agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Bibliografia b = bibliografiaFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        bibliografiaRepository.save(b);
    }

    @Override
    public void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);
        if(bibliografiaOptional.isPresent()){
            Bibliografia b = bibliografiaOptional.get();
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
            bibliografiaRepository.save(b);
        }
        else{
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        this.bibliografiaRepository.deleteById(id);
    }


}
