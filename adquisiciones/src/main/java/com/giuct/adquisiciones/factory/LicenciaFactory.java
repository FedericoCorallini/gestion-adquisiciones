package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class LicenciaFactory extends AdquisicionFactory{

    public LicenciaFactory(ModelMapper modelMapper) {
        super(modelMapper);
    }

    @Override
    public Licencia crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Licencia licencia = modelMapper.map(adquisicionDTO, Licencia.class);
        licencia.setFuenteFinanciamiento(fuenteFinanciamiento);
        licencia.setBorrado(false);

        return licencia;
    }
}
