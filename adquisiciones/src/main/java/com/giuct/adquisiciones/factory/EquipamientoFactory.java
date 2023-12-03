package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.stereotype.Component;

@Component
public class EquipamientoFactory extends AdquisicionFactory{
    @Override
    public Equipamiento crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Equipamiento e = new Equipamiento();
        e.setFuenteFinanciamiento(fuenteFinanciamiento);
        e.setDenominacion(adquisicionDTO.getDenominacion());
        e.setFechaIncorporacion(adquisicionDTO.getFechaIncorporacion());
        e.setCosto(adquisicionDTO.getCosto());
        e.setDescripcion(adquisicionDTO.getDescripcion());
        return e;
    }
}
