package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IEquipamientoRepository extends JpaRepository<Equipamiento, Long> {
    Page<Equipamiento> findByFuenteFinanciamientoAndBorrado(FuenteFinanciamiento fuenteFinanciamiento, Boolean borrado, Pageable pageable);
    Page<Equipamiento> findByBorrado(Boolean borrado, Pageable pageable);
    Optional<Equipamiento> findByIdAndBorrado(Long id, Boolean borrado);
}

