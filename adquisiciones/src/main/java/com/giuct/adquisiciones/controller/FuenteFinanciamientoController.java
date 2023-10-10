package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.service.FinanciamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FuenteFinanciamientoController {

    FinanciamientoService financiamientoService;

    public FuenteFinanciamientoController(FinanciamientoService financiamientoService) {
        this.financiamientoService = financiamientoService;
    }

    @GetMapping("/fuentes-financiamiento")
    public ResponseEntity<List<FuenteFinanciamiento>> obtenerFuentes(){
        return ResponseEntity.ok(financiamientoService.getFuentes());
    }
}
