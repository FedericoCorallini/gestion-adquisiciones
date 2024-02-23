package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class EquipamientoFactory extends AdquisicionFactory{

    public EquipamientoFactory(ModelMapper modelMapper) {
        super(modelMapper);
    }

    @Override
    public Equipamiento crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Equipamiento equipamiento = modelMapper.map(adquisicionDTO, Equipamiento.class);
        equipamiento.setFuenteFinanciamiento(fuenteFinanciamiento);
        equipamiento.setBorrado(false);

        return equipamiento;
    }
}
