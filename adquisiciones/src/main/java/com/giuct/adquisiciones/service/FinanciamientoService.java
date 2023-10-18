package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IFuenteRepository;
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

    public FuenteFinanciamiento getFuenteById(Long id){
        return iFuenteRepository.getReferenceById(id);
    }

    public void crear(FuenteFinanciamiento fuenteFinanciamiento) {
        fuenteFinanciamiento.setFechaAcreditacion(LocalDateTime.now());
        iFuenteRepository.save(fuenteFinanciamiento);
    }
}
