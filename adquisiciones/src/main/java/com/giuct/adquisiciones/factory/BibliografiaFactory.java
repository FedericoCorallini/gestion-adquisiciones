package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class BibliografiaFactory extends AdquisicionFactory{

    public BibliografiaFactory(ModelMapper modelMapper) {
        super(modelMapper);
    }

    @Override
    public Bibliografia crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        return modelMapper.map(adquisicionDTO, Bibliografia.class);
    }
}
