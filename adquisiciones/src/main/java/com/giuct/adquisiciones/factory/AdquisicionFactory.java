package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public abstract class AdquisicionFactory {

        public abstract Adquisicion crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento);
}
