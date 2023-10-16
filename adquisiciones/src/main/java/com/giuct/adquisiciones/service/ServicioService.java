package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IServicioRepositoty;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ServicioService {
    private IServicioRepositoty iRepositoty;

    public ServicioService(IServicioRepositoty iRepositoty) {
        this.iRepositoty = iRepositoty;
    }


    public void agregarServicio(Servicio servicio){
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
