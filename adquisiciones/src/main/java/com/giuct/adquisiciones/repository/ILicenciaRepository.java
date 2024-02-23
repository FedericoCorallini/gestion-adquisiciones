package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ILicenciaRepository extends JpaRepository<Licencia, Long> {
    Page<Licencia> findByFuenteFinanciamientoAndBorrado(FuenteFinanciamiento fuenteFinanciamiento, Boolean borrado, Pageable pageable);
    Page<Licencia> findByBorrado(Boolean borrado, Pageable pageable);
    Optional<Licencia> findByIdAndBorrado(Long id, Boolean borrado);
}
