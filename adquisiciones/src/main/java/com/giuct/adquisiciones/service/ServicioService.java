package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.ServiceFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("servicios")
@AllArgsConstructor
public class ServicioService extends AdquisicionService{

    private final IServicioRepository servicioRepository;
    private final FinanciamientoService financiamientoService;
    private final ServiceFactory serviceFactory;

    @Override
    public Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    @Override
    public Adquisicion getAdquisicionById(Long id) {
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        if(servicioOptional.isPresent()){
            return servicioOptional.get();
        }
        throw new InvalidAdquisicionException("El servicio solicitado no existe");
    }

    @Override
    public Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return servicioRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    @Override
    public void agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Servicio s = serviceFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        this.servicioRepository.save(s);
    }

    @Override
    public void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        if(servicioOptional.isPresent()){
            Servicio s = servicioOptional.get();
            s.setTipo(adquisicionDTO.getTipo());
            s.setCosto(adquisicionDTO.getCosto());
            s.setDescripcion(adquisicionDTO.getDescripcion());
            servicioRepository.save(s);
        }
        else{
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        servicioRepository.deleteById(id);
    }
}
