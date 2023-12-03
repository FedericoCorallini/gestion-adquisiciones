package com.giuct.adquisiciones.factory;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class BibliografiaFactory extends AdquisicionFactory{
    @Override
    public Bibliografia crear(AdquisicionDTO adquisicionDTO, FuenteFinanciamiento fuenteFinanciamiento) {
        Bibliografia b = new Bibliografia();
        b.setAnioPublicacion(adquisicionDTO.getAnioPublicacion());
        b.setIssn(adquisicionDTO.getIssn());
        b.setIsbn(adquisicionDTO.getIsbn());
        b.setTipo(adquisicionDTO.getTipo());
        b.setEditorial(adquisicionDTO.getEditorial());
        b.setApellidoAutor(adquisicionDTO.getApellidoAutor());
        b.setNombreAutor(adquisicionDTO.getNombreAutor());
        b.setUrl(adquisicionDTO.getUrl());
        b.setTitulo(adquisicionDTO.getTitulo());
        b.setCosto(adquisicionDTO.getCosto());
        b.setDescripcion(adquisicionDTO.getDescripcion());
        b.setFuenteFinanciamiento(fuenteFinanciamiento);
        return b;
    }
}
