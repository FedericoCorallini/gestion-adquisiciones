package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IServicioRepository extends JpaRepository<Servicio, Long>{
    Page<Servicio> findByFuenteFinanciamientoAndBorrado(FuenteFinanciamiento fuenteFinanciamiento, Boolean borrado, Pageable pageable);
    Page<Servicio> findByBorrado(Boolean borrado, Pageable pageable);
    Optional<Servicio> findByIdAndBorrado(Long id, Boolean borrado);
}
