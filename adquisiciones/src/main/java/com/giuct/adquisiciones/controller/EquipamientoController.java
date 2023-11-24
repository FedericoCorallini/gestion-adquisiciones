package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.dto.PaginacionOrdenamientoDTO;
import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.service.EquipamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("equipamientos")
public class EquipamientoController {
    public final EquipamientoService equipamientoService;

    public EquipamientoController(EquipamientoService equipamientoService) {
        this.equipamientoService = equipamientoService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<Equipamiento> getEquipamiento(@PathVariable Long id){
        return ResponseEntity.ok(equipamientoService.getEquipamientoById(id));
    }

    @GetMapping()
    public ResponseEntity<List<Equipamiento>> getEquipamientosList(@RequestBody PaginacionOrdenamientoDTO paginacionOrdenamientoDTO){
        return ResponseEntity.ok(equipamientoService.getEquipamientos(paginacionOrdenamientoDTO));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<List<Equipamiento>> getEquipamientosByFinanciamiento(@PathVariable Long idFinanciamiento){
        return ResponseEntity.ok(equipamientoService.getEquipamientosByFinanciamiento(idFinanciamiento));
    }

    @PostMapping("/{idFinanciamiento}")
    public ResponseEntity<String> agregarEquipamiento(@RequestBody Equipamiento equipamiento, @PathVariable Long idFinanciamiento){
        this.equipamientoService.agregarEquipamiento(equipamiento, idFinanciamiento);
        return ResponseEntity.ok("Equipamiento agregado");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarEquipamiento(@RequestBody Equipamiento equipamiento, @PathVariable Long id){
        this.equipamientoService.modificarEquipamiento(id, equipamiento);
        return ResponseEntity.ok("Servicio modificado");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEquipamiento(@PathVariable Long id){
        this.equipamientoService.eliminarEquipamiento(id);
        return ResponseEntity.ok("Servicio eliminado");
    }




//    @GetMapping("/ordenar/{criterio}")
//    public  ResponseEntity<List<Equipamiento>> obtenerServiciosOrdenados(@PathVariable String criterio){
//        return ResponseEntity.ok(servicioService.getServiciosOrdenados(criterio));
//    }
//
//    @GetMapping("/paginar/{nroPagina}/{nroElementos}")
//    public ResponseEntity<Page<Servicio>> obtenerServiciosPaginados(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos){
//        return ResponseEntity.ok(servicioService.getServiciosPaginados(nroPagina, nroElementos));
//    }
//
//    @GetMapping("/paginar/{nroPagina}/{nroElementos}/{criterio}")
//    public ResponseEntity<Page<Servicio>> obtenerServiciosPaginadosOrdenados(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos, @PathVariable String criterio){
//        return ResponseEntity.ok(servicioService.getServiciosPaginadosOrdenados(nroPagina, nroElementos, criterio));
//    }
//
//
//    @GetMapping("/financiamiento/{idFinanciamiento}/ordenar/{criterio}")
//    public ResponseEntity<List<Servicio>> getServiciosPorFinanciamientoOrdenado(@PathVariable Long idFinanciamiento, @PathVariable String criterio){
//        List<Servicio> servicio = servicioService.getServiciosByFinanciamientoOrdenado(idFinanciamiento, criterio);
//        return ResponseEntity.ok(servicio);
//    }
//
//    @GetMapping("/financiamiento/{idFinanciamiento}/paginar/{nroPagina}/{nroElementos}")
//    public ResponseEntity<Page<Servicio>> getServiciosPorFinanciamientoPaginado(@PathVariable Long idFinanciamiento, @PathVariable Integer nroPagina, @PathVariable Integer nroElementos){
//        Page<Servicio> servicio = servicioService.getServiciosByFinanciamientoPaginado(idFinanciamiento, nroPagina, nroElementos);
//        return ResponseEntity.ok(servicio);
//    }
//
//    @GetMapping("/financiamiento/{idFinanciamiento}/paginar/{nroPagina}/{nroElementos}/{criterio}")
//    public ResponseEntity<Page<Servicio>> getServiciosPorFinanciamientoOrdenadoPaginado(@PathVariable Long idFinanciamiento, @PathVariable Integer nroPagina, @PathVariable Integer nroElementos, @PathVariable String criterio){
//        Page<Servicio> servicio = servicioService.getServiciosByFinanciamientoPaginadoOrdenado(idFinanciamiento, nroPagina, nroElementos, criterio);
//        return ResponseEntity.ok(servicio);
//    }
}
