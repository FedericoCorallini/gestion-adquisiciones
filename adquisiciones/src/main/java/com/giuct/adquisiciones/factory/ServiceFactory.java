package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import org.springframework.stereotype.Component;

@Component
public class ServiceFactory extends AdquisicionFactory{

    @Override
    public Servicio crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Servicio s = new Servicio();
        s.setFuenteFinanciamiento(fuenteFinanciamiento);
        s.setTipo(adquisicionDTO.getTipo());
        s.setCosto(adquisicionDTO.getCosto());
        s.setDescripcion(adquisicionDTO.getDescripcion());
        return s;
    }
}
