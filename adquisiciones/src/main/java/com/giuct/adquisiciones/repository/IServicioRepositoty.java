package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IServicioRepositoty extends JpaRepository<Servicio, Long>{
    Servicio getById(Long id);
}
