package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import org.springframework.stereotype.Component;

@Component
public class LicenciaFactory extends AdquisicionFactory{
    @Override
    public Licencia crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Licencia l = new Licencia();
        l.setFuenteFinanciamiento(fuenteFinanciamiento);
        l.setAnio(adquisicionDTO.getAnio());
        l.setFabricante(adquisicionDTO.getFabricante());
        l.setNombre(adquisicionDTO.getNombre());
        l.setFechaOtorgamiento(adquisicionDTO.getFechaOtorgamiento());
        l.setFechaVencimiento(adquisicionDTO.getFechaVencimiento());
        l.setNumeroRelease(adquisicionDTO.getNumeroRelease());
        l.setVersion(adquisicionDTO.getVersion());
        l.setCosto(adquisicionDTO.getCosto());
        l.setDescripcion(adquisicionDTO.getDescripcion());
        return l;
    }
}
