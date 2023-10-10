package com.giuct.adquisiciones.repository;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFuenteRepository extends JpaRepository<FuenteFinanciamiento, Long>{
}
