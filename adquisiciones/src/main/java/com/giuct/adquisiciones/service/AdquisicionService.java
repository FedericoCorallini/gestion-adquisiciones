package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public abstract class AdquisicionService {

    protected final IFuenteRepository fuenteRepository;
    protected final FinanciamientoService financiamientoService;
    protected final ModelMapper modelMapper;

    public abstract Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos);

    public abstract Adquisicion getAdquisicionById(Long id);

    public abstract Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio);

    public abstract AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento);

    public abstract AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO);

    public abstract void eliminarAdquisicion(Long id);
}
