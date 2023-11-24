package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioService {
    private final IServicioRepository servicioRepository;
    private final FinanciamientoService financiamientoService;

    public ServicioService(IServicioRepository servicioRepository, FinanciamientoService financiamientoService) {
        this.servicioRepository = servicioRepository;
        this.financiamientoService = financiamientoService;
    }

    public void agregarServicio(Servicio servicio, Long id){
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(id);
        servicio.setFuenteFinanciamiento(fuenteFinanciamiento);
        this.servicioRepository.save(servicio);
    }

    public void eliminarServicio(Long id){
        servicioRepository.deleteById(id);
    }

    public List<Servicio> getServicios(){
        return servicioRepository.findAll();
    }

    public Servicio getServicioById(Long id){
        final Servicio servicio = servicioRepository.findById(id).get();
        return servicio;
    }
    public List<Servicio> getServiciosOrdenados(String criterio) {
        return servicioRepository.findAll(Sort.by(criterio).descending());
    }

    public Page<Servicio> getServiciosPaginados(Integer nroPagina, Integer nroElementos) {
        return servicioRepository.findAll(PageRequest.of(nroPagina, nroElementos));
    }

    public Page<Servicio> getServiciosPaginadosOrdenados(Integer nroPagina, Integer nroElementos, String criterio) {
        return servicioRepository.findAll(PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public List<Servicio> getServiciosByFinanciamiento(Long id){
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(id);
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento);
    }

    public List<Servicio> getServiciosByFinanciamientoOrdenado(Long idFinanciamiento, String criterio) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, Sort.by(criterio));

    }

    public Page<Servicio> getServiciosByFinanciamientoPaginado(Long idFinanciamiento, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina,nroElementos));

    }

    public Page<Servicio> getServiciosByFinanciamientoPaginadoOrdenado(Long idFinanciamiento, Integer nroPagina, Integer nroElementos, String criterio) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        return servicioRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));

    }
}
