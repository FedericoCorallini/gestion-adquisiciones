package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioService {
    private final IServicioRepository servicioRepository;
    private final FinanciamientoService financiamientoService;

    public ServicioService(IServicioRepository servicioRepository, FinanciamientoService financiamientoService) {
        this.servicioRepository = servicioRepository;
        this.financiamientoService = financiamientoService;
    }

    public Servicio getServicioById(Long id){
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        if(servicioOptional.isPresent()){
            return servicioOptional.get();
        }
        throw new InvalidAdquisicionException("El servicio solicitado no existe");
    }

    public Page<Servicio> getServicios(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return servicioRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    public Page<Servicio> getServiciosByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }
    public void agregarServicio(Servicio servicio, Long id){
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(id);
        servicio.setFuenteFinanciamiento(fuenteFinanciamiento);
        this.servicioRepository.save(servicio);
    }

    public void modificarServicio(Long id, Servicio servicio) {
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        if(servicioOptional.isPresent()){
            Servicio s = servicioOptional.get();
            s.setTipo(servicio.getTipo());
            s.setCosto(servicio.getCosto());
            s.setDescripcion(servicio.getDescripcion());
            servicioRepository.save(s);
        }
        else{
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }
    }

    public void eliminarServicio(Long id){
        servicioRepository.deleteById(id);
    }
}
