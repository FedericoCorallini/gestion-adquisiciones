package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.service.FinanciamientoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("fuentes-financiamiento")
@CrossOrigin
public class FuenteFinanciamientoController {

    FinanciamientoService financiamientoService;

    public FuenteFinanciamientoController(FinanciamientoService financiamientoService) {
        this.financiamientoService = financiamientoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuenteFinanciamiento> getFuenteFinanciamiento(@PathVariable Long id){
        return ResponseEntity.ok(financiamientoService.getFuenteById(id));
    }

//    @GetMapping
//    public ResponseEntity<Page<FuenteFinanciamiento>> getFuentesFinanciamiento(
//            @AuthenticationPrincipal Jwt jwt,
//            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
//            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
//            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
//        return ResponseEntity.ok(financiamientoService.getFuentes(jwt, nroPagina, nroElementos, criterio));
//    }

    @GetMapping
    public ResponseEntity<Page<FuenteFinanciamiento>> getFuentesFinanciamiento(
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(financiamientoService.getFuentes(nroPagina, nroElementos, criterio));
    }

    @PostMapping
    public ResponseEntity<String> agregarFuenteFinanciamiento(@RequestBody FuenteFinanciamiento fuenteFinanciamiento){
        financiamientoService.crear(fuenteFinanciamiento);
        return ResponseEntity.ok("Financiamiento creado");
    }
}
