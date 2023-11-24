package com.giuct.adquisiciones.service;


import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IBibliografiaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BibliografiaService {
    private final IBibliografiaRepository bibliografiaRepository;
    private final FinanciamientoService financiamientoService;

    public BibliografiaService(IBibliografiaRepository bibliografiaRepository, FinanciamientoService financiamientoService) {
        this.bibliografiaRepository = bibliografiaRepository;
        this.financiamientoService = financiamientoService;
    }

    public Bibliografia getBibliografiaById(Long id) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);
        if(bibliografiaOptional.isPresent()){
            return bibliografiaOptional.get();
        }
        throw new InvalidAdquisicionException("La bibliografia solicitada no existe");
    }

    public Page<Bibliografia> getBibliografias(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return bibliografiaRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    public Page<Bibliografia> getBibliografiasByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return bibliografiaRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public void agregarBibliografia(Bibliografia bibliografia, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        bibliografia.setFuenteFinanciamiento(fuenteFinanciamiento);
        bibliografiaRepository.save(bibliografia);
    }

    public void modificarBibliografia(Long id, Bibliografia bibliografia) {
        Optional<Bibliografia> bibliografiaOptional = bibliografiaRepository.findById(id);
        if(bibliografiaOptional.isPresent()){
            Bibliografia b = bibliografiaOptional.get();
            b.setAnioPublicacion(bibliografia.getAnioPublicacion());
            b.setIssn(bibliografia.getIssn());
            b.setIsbn(bibliografia.getIsbn());
            b.setTipo(bibliografia.getTipo());
            b.setEditorial(bibliografia.getEditorial());
            b.setApellidoAutor(bibliografia.getApellidoAutor());
            b.setNombreAutor(bibliografia.getNombreAutor());
            b.setUrl(bibliografia.getUrl());
            b.setTitulo(bibliografia.getTitulo());
            b.setCosto(bibliografia.getCosto());
            b.setDescripcion(bibliografia.getDescripcion());
            bibliografiaRepository.save(b);
        }
        else{
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }
    }

    public void eliminarBibliografia(Long id) {
        this.bibliografiaRepository.deleteById(id);
    }
}
