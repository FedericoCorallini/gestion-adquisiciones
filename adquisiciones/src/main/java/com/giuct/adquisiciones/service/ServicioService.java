package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepositoty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ServicioService {
    private final IServicioRepositoty iRepositoty;
    private final FinanciamientoService financiamientoService;

    public ServicioService(IServicioRepositoty iRepositoty, FinanciamientoService financiamientoService) {
        this.iRepositoty = iRepositoty;
        this.financiamientoService = financiamientoService;
    }


    public void agregarServicio(Servicio servicio){
        servicio.setFuenteFinanciamiento(financiamientoService.getFuenteById(1L));
        iRepositoty.save(servicio);
    }

    public void eliminarServicio(Long id){
        iRepositoty.deleteById(id);
    }

    public List<Servicio> getServicios(){
        return iRepositoty.findAll();
    }

    public List<Servicio> getByFinanciamiento(Long id){
        List<Servicio> servicio = iRepositoty.findAll();
        return servicio.stream().filter(s -> Objects.equals(s.getFuenteFinanciamiento().getId(), id)).toList();
    }
    public Servicio getServicioById(Long id){
        final Servicio servicio = iRepositoty.findById(id).get();
        //final Servicio servicio = iRepositoty.getReferenceById(id);
        return servicio;
    }

}
