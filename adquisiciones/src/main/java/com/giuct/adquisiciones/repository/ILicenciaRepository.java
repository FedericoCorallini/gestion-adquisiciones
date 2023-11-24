package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILicenciaRepository extends JpaRepository<Licencia, Long> {
    Page<Licencia> findByFuenteFinanciamiento(FuenteFinanciamiento fuenteFinanciamiento, Pageable pageable);
}
