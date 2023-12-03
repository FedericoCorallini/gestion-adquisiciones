package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.EquipamientoFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.repository.IEquipamientoRepository;
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
        equipamientoRepository.save(e);
    }

    @Override
    public void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findById(id);
        if(equipamientoOptional.isPresent()){
            Equipamiento e = equipamientoOptional.get();
            e.setDenominacion(adquisicionDTO.getDenominacion());
            e.setFechaIncorporacion(adquisicionDTO.getFechaIncorporacion());
            e.setCosto(adquisicionDTO.getCosto());
            e.setDescripcion(adquisicionDTO.getDescripcion());
            equipamientoRepository.save(e);
        }
        else{
            throw new InvalidAdquisicionException("El equipamiento que desea modificar no existe");
        }
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        this.equipamientoRepository.deleteById(id);
    }
}
