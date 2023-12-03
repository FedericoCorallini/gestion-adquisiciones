package com.giuct.adquisiciones.config;

import java.util.Map;

import com.giuct.adquisiciones.service.*;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class ServiceConfig {

    private final BibliografiaService bibliografiaService;
    private final LicenciaService licenciaService;
    private final EquipamientoService equipamientoService;
    private final ServicioService servicioService;

    @Bean
    public Map<String, AdquisicionService> serviceMap(){
        return Map.of("bibliografias", bibliografiaService,
                "servicios", servicioService,
                "licenicas", licenciaService,
                "equipamientos", equipamientoService);
    }
}
