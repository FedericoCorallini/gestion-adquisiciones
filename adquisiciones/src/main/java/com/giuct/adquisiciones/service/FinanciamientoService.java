package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanciamientoService {

    IFuenteRepository iFuenteRepository;

    public FinanciamientoService(IFuenteRepository iFuenteRepository) {
        this.iFuenteRepository = iFuenteRepository;
    }

    public List<FuenteFinanciamiento> getFuentes() {
        return iFuenteRepository.findAll();
    }

    public List<FuenteFinanciamiento> getFuentesOrdenadas(String criterio){
        return iFuenteRepository.findAll(Sort.by(criterio).ascending());
    }

    public Page<FuenteFinanciamiento> getFuentesPaginadas(Integer nroPagina, Integer nroElementos){
        return iFuenteRepository.findAll(PageRequest.of(nroPagina,nroElementos));
    }

    public Page<FuenteFinanciamiento> getFuentesPaginadasOrdenadas(Integer nroPagina, Integer nroElementos, String criterio){
        return iFuenteRepository.findAll(PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public FuenteFinanciamiento getFuenteById(Long id){
        return iFuenteRepository.getReferenceById(id);
    }

    public void crear(FuenteFinanciamiento fuenteFinanciamiento) {
        fuenteFinanciamiento.setFechaAcreditacion(LocalDateTime.now());
        iFuenteRepository.save(fuenteFinanciamiento);
    }
}
