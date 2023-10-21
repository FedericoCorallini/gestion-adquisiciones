package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepositoty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ServicioService {
    private final IServicioRepositoty iRepositoty;
    private final FinanciamientoService financiamientoService;

    public ServicioService(IServicioRepositoty iRepositoty, FinanciamientoService financiamientoService) {
        this.iRepositoty = iRepositoty;
        this.financiamientoService = financiamientoService;
    }


    public void agregarServicio(Servicio servicio){
        Optional<FuenteFinanciamiento> fuenteFinanciamiento = financiamientoService.getFuenteById(1L);
        if(fuenteFinanciamiento.isPresent()){
            servicio.setFuenteFinanciamiento(fuenteFinanciamiento.get());
        }
        iRepositoty.save(servicio);
    }

    public void eliminarServicio(Long id){
        iRepositoty.deleteById(id);
    }

    public List<Servicio> getServicios(){
        return iRepositoty.findAll();
    }

    public Servicio getServicioById(Long id){
        final Servicio servicio = iRepositoty.findById(id).get();
        //final Servicio servicio = iRepositoty.getReferenceById(id);
        return servicio;
    }
    public List<Servicio> getServiciosOrdenados(String criterio) {
        return iRepositoty.findAll(Sort.by(criterio).descending());
    }

    public Page<Servicio> getServiciosPaginados(Integer nroPagina, Integer nroElementos) {
        return iRepositoty.findAll(PageRequest.of(nroPagina, nroElementos));
    }

    public Page<Servicio> getServiciosPaginadosOrdenados(Integer nroPagina, Integer nroElementos, String criterio) {
        return iRepositoty.findAll(PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public List<Servicio> getServiciosByFinanciamiento(Long id){
        Optional<FuenteFinanciamiento> fuenteFinanciamiento = financiamientoService.getFuenteById(id);
        if(fuenteFinanciamiento.isPresent()){
            List<Servicio> servicios = iRepositoty.findByFuenteFinanciamiento(fuenteFinanciamiento.get());
            return servicios;
        }
        return new ArrayList<>();
    }

    public List<Servicio> getServiciosByFinanciamientoOrdenado(Long idFinanciamiento, String criterio) {
        Optional<FuenteFinanciamiento> fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(fuenteFinanciamiento.isPresent()){
            List<Servicio> servicios = iRepositoty.findByFuenteFinanciamiento(fuenteFinanciamiento.get(), Sort.by(criterio));
            return servicios;
        };
        return null;
    }

    public Page<Servicio> getServiciosByFinanciamientoPaginado(Long idFinanciamiento, Integer nroPagina, Integer nroElementos) {

        Optional<FuenteFinanciamiento> fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(fuenteFinanciamiento.isPresent()){
            return iRepositoty.findByFuenteFinanciamiento(fuenteFinanciamiento.get(), PageRequest.of(nroPagina,nroElementos));
        };
        return null;
    }

    public Page<Servicio> getServiciosByFinanciamientoPaginadoOrdenado(Long idFinanciamiento, Integer nroPagina, Integer nroElementos, String criterio) {
        Optional<FuenteFinanciamiento> fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(fuenteFinanciamiento.isPresent()){
            Page<Servicio> servicios = iRepositoty.findByFuenteFinanciamiento(fuenteFinanciamiento.get(), PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
           return servicios;
        };
        return null;
    }
}
