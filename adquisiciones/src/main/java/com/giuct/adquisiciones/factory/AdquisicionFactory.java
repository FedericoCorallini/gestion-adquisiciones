package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public abstract class AdquisicionFactory {

        final ModelMapper modelMapper;

        public abstract Adquisicion crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento);
}
