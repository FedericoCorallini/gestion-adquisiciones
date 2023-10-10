package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IRepositoty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ServicioService {
    private IRepositoty iRepositoty;

    public ServicioService(IRepositoty iRepositoty) {
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

    public Optional<Servicio> obtenerServicioById(Long id){
        List<Servicio> servicio = iRepositoty.findAll();
        return servicio.stream().filter(s -> Objects.equals(s.getId(), id)).toList().stream().findFirst();
    }
    public Servicio getServicioById(Long id){
        final Servicio servicio = iRepositoty.getById(id);
        return servicio;
    }


}
