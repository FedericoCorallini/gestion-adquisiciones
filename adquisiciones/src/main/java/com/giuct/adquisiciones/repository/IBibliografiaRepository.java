package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBibliografiaRepository extends JpaRepository<Bibliografia, Long> {
    Page<Bibliografia> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Pageable pageable);
}
