package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IServicioRepository extends JpaRepository<Servicio, Long>{

    List<Servicio> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento);

    Page<Servicio> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Pageable pageable);

    List<Servicio> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Sort sort);
}
