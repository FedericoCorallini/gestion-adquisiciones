package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.EquipamientoFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.*;
import com.giuct.adquisiciones.repository.IEquipamientoRepository;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("equipamientos")
@AllArgsConstructor
public class EquipamientoService extends AdquisicionService{

    private final IEquipamientoRepository equipamientoRepository;
    private final FinanciamientoService financiamientoService;
    private final EquipamientoFactory equipamientoFactory;
    private final IFuenteRepository fuenteRepository;


    @Override
    public Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return equipamientoRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));

    }

    @Override
    public Adquisicion getAdquisicionById(Long id) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);
        if(equipamientoOptional.isPresent()){
            return equipamientoOptional.get();
        }
        throw new InvalidAdquisicionException("El equipamiento solicitado no existe");
    }


    @Override
    public Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return equipamientoRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }


    @Override
    public void agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Equipamiento e = equipamientoFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-e.getCosto());
        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }
        this.fuenteRepository.save(fuenteFinanciamiento);
        equipamientoRepository.save(e);
    }

    @Override
    public void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);
        if(equipamientoOptional.isPresent()){
            Equipamiento e = equipamientoOptional.get();
            FuenteFinanciamiento fuenteFinanciamiento = e.getFuenteFinanciamiento();

            fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()+e.getCosto()-adquisicionDTO.getCosto());
            if (fuenteFinanciamiento.getMonto() < 0){
                throw new InvalidAdquisicionException("Fondos insuficientes");
            }
            e.setDenominacion(adquisicionDTO.getDenominacion());
            e.setFechaIncorporacion(adquisicionDTO.getFechaIncorporacion());
            e.setCosto(adquisicionDTO.getCosto());
            e.setDescripcion(adquisicionDTO.getDescripcion());
            this.fuenteRepository.save(fuenteFinanciamiento);
            equipamientoRepository.save(e);
        }
        else{
            throw new InvalidAdquisicionException("El equipamiento que desea modificar no existe");
        }
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);

        if (equipamientoOptional.isEmpty()) {
            throw new InvalidAdquisicionException("La adquisicion no existe");
        }

        Equipamiento equipamiento = equipamientoOptional.get();
        FuenteFinanciamiento fuenteFinanciamiento = equipamiento.getFuenteFinanciamiento();
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + equipamiento.getCosto());
        equipamientoRepository.deleteById(id);
        fuenteRepository.save(fuenteFinanciamiento);
    }
}
