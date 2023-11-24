package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IEquipamientoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EquipamientoService {

    private final IEquipamientoRepository equipamientoRepository;
    private final FinanciamientoService financiamientoService;

    public EquipamientoService(IEquipamientoRepository equipamientoRepository, FinanciamientoService financiamientoService) {
        this.equipamientoRepository = equipamientoRepository;
        this.financiamientoService = financiamientoService;
    }

    public Page<Equipamiento> getEquipamientos(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return equipamientoRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    public Equipamiento getEquipamientoById(Long id) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);
        if(equipamientoOptional.isPresent()){
            return equipamientoOptional.get();
        }
        throw new InvalidAdquisicionException("El equipamiento solicitado no existe");
    }

    public Page<Equipamiento> getEquipamientosByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return equipamientoRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public void agregarEquipamiento(Equipamiento equipamiento, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        equipamiento.setFuenteFinanciamiento(fuenteFinanciamiento);
        equipamientoRepository.save(equipamiento);
    }

    public void modificarEquipamiento(Long id, Equipamiento equipamiento) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);
        if(equipamientoOptional.isPresent()){
            Equipamiento e = equipamientoOptional.get();
            e.setDenominacion(equipamiento.getDenominacion());
            e.setFechaIncorporacion(equipamiento.getFechaIncorporacion());
            e.setCosto(equipamiento.getCosto());
            e.setDescripcion(equipamiento.getDescripcion());
            equipamientoRepository.save(e);
        }
        else{
            throw new InvalidAdquisicionException("El equipamiento que desea modificar no existe");
        }
    }

    public void eliminarEquipamiento(Long id) {
        this.equipamientoRepository.deleteById(id);
    }
}
