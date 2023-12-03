package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public abstract class AdquisicionService {
    public abstract Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos);

    public abstract Adquisicion getAdquisicionById(Long id);

    public abstract Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio);

    public abstract void agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento);

    public abstract void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO);

    public abstract void eliminarAdquisicion(Long id);
}
