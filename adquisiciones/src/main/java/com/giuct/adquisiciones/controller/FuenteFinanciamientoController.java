package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.service.FinanciamientoService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fuentes-financiamiento")
public class FuenteFinanciamientoController {

    FinanciamientoService financiamientoService;

    public FuenteFinanciamientoController(FinanciamientoService financiamientoService) {
        this.financiamientoService = financiamientoService;
    }

    @GetMapping
    @RolesAllowed("admin_client_role")
    public ResponseEntity<List<FuenteFinanciamiento>> obtenerFuentes(){
        return ResponseEntity.ok(financiamientoService.getFuentes());
    }

    @GetMapping("/ordenar/{criterio}")
    public ResponseEntity<List<FuenteFinanciamiento>> obtenerFuentesOrdenadas(@PathVariable String criterio){
        return ResponseEntity.ok(financiamientoService.getFuentesOrdenadas(criterio));
    }

    @GetMapping("/paginar/{nroPagina}/{nroElementos}")
    public ResponseEntity<Page<FuenteFinanciamiento>> obternerFuentesPaginadas(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos){
        return ResponseEntity.ok(financiamientoService.getFuentesPaginadas(nroPagina, nroElementos));
    }
    @GetMapping("/paginar/{nroPagina}/{nroElementos}/{criterio}")
    public ResponseEntity<Page<FuenteFinanciamiento>> obternerFuentesPaginadas(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos, @PathVariable String criterio){
        return ResponseEntity.ok(financiamientoService.getFuentesPaginadasOrdenadas(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> obtenerFuente(@PathVariable Long id){
        return ResponseEntity.ok(financiamientoService.getFuenteById(id).toString());
    }

    @PostMapping
    public ResponseEntity<String> crearFinanciamiento(@RequestBody FuenteFinanciamiento fuenteFinanciamiento){
        financiamientoService.crear(fuenteFinanciamiento);
        return ResponseEntity.ok("Financiamiento creado");
    }
}
