package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEquipamientoRepository extends JpaRepository<Equipamiento, Long>{
    List<Equipamiento> findByFunteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento);
    Page<Equipamiento> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Pageable pageable);
    List<Equipamiento> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Sort sort);

}
