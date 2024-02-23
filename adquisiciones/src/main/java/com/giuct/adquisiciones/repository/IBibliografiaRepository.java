package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IBibliografiaRepository extends JpaRepository<Bibliografia, Long> {
    Page<Bibliografia> findByFuenteFinanciamientoAndBorrado(FuenteFinanciamiento fuenteFinanciamiento, Boolean borrado, Pageable pageable);
    Page<Bibliografia> findByBorrado(Boolean borrado, Pageable pageable);
    Optional<Bibliografia> findByIdAndBorrado(Long id, Boolean borrado);
}
