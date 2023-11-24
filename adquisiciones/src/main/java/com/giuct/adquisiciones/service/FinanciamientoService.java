package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidFuenteFinanciamientoException;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class FinanciamientoService {

    private final IFuenteRepository fuenteRepository;

    public FinanciamientoService(IFuenteRepository iFuenteRepository) {
        this.fuenteRepository = iFuenteRepository;
    }

    public FuenteFinanciamiento getFuenteById(Long id){
        Optional<FuenteFinanciamiento> fuenteFinanciamientoOptional = fuenteRepository.findById(id);
        if(fuenteFinanciamientoOptional.isPresent()){
            return fuenteFinanciamientoOptional.get();
        }
        throw new InvalidFuenteFinanciamientoException("La fuente de financiamiento no existe");
    }

    public Page<FuenteFinanciamiento> getFuentes(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return fuenteRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    public void crear(FuenteFinanciamiento fuenteFinanciamiento) {
        fuenteFinanciamiento.setFechaAcreditacion(LocalDate.now());
        fuenteRepository.save(fuenteFinanciamiento);
    }
}
