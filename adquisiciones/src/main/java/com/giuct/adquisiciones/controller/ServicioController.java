package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.service.ServicioService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("servicios")
public class ServicioController {

    ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }


    @GetMapping()
    public ResponseEntity<List<Servicio>> getServiciosList(){
        return ResponseEntity.ok(servicioService.getServicios());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerServiciosList(@PathVariable Long id){
        Servicio servicio = servicioService.getServicioById(id);
        return ResponseEntity.ok(servicio);
    }

    @GetMapping("/ordenar/{criterio}")
    public  ResponseEntity<List<Servicio>> obtenerServiciosOrdenados(@PathVariable String criterio){
        return ResponseEntity.ok(servicioService.getServiciosOrdenados(criterio));
    }

    @GetMapping("/paginar/{nroPagina}/{nroElementos}")
    public ResponseEntity<Page<Servicio>> obtenerServiciosPaginados(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos){
        return ResponseEntity.ok(servicioService.getServiciosPaginados(nroPagina, nroElementos));
    }

    @GetMapping("/paginar/{nroPagina}/{nroElementos}/{criterio}")
    public ResponseEntity<Page<Servicio>> obtenerServiciosPaginadosOrdenados(@PathVariable Integer nroPagina, @PathVariable Integer nroElementos, @PathVariable String criterio){
        return ResponseEntity.ok(servicioService.getServiciosPaginadosOrdenados(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<List<Servicio>> getServiciosPorFinanciamiento(@PathVariable Long idFinanciamiento){
        List<Servicio> servicio = servicioService.getServiciosByFinanciamiento(idFinanciamiento);
        return ResponseEntity.ok(servicio);
    }


    @GetMapping("/financiamiento/{idFinanciamiento}/ordenar/{criterio}")
    public ResponseEntity<List<Servicio>> getServiciosPorFinanciamientoOrdenado(@PathVariable Long idFinanciamiento, @PathVariable String criterio){
        List<Servicio> servicio = servicioService.getServiciosByFinanciamientoOrdenado(idFinanciamiento, criterio);
        return ResponseEntity.ok(servicio);
    }

    @GetMapping("/financiamiento/{idFinanciamiento}/paginar/{nroPagina}/{nroElementos}")
    public ResponseEntity<Page<Servicio>> getServiciosPorFinanciamientoPaginado(@PathVariable Long idFinanciamiento, @PathVariable Integer nroPagina, @PathVariable Integer nroElementos){
        Page<Servicio> servicio = servicioService.getServiciosByFinanciamientoPaginado(idFinanciamiento, nroPagina, nroElementos);
        return ResponseEntity.ok(servicio);
    }

    @GetMapping("/financiamiento/{idFinanciamiento}/paginar/{nroPagina}/{nroElementos}/{criterio}")
    public ResponseEntity<Page<Servicio>> getServiciosPorFinanciamientoOrdenadoPaginado(@PathVariable Long idFinanciamiento, @PathVariable Integer nroPagina, @PathVariable Integer nroElementos, @PathVariable String criterio){
        Page<Servicio> servicio = servicioService.getServiciosByFinanciamientoPaginadoOrdenado(idFinanciamiento, nroPagina, nroElementos, criterio);
        return ResponseEntity.ok(servicio);
    }

    @PostMapping
    public ResponseEntity<String> crearServicio(@RequestBody Servicio servicio){
        servicioService.agregarServicio(servicio);
        return ResponseEntity.ok("Servicio creado");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificarServicio(@RequestBody Servicio servicio, @PathVariable Long id){
        try{
            Servicio servicio1 = servicioService.getServicioById(id);
            servicioService.agregarServicio(servicio);
            return ResponseEntity.ok("Servicio modificado");
        }
        catch (Exception exception){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> modificarServicio(@PathVariable Long id){
        servicioService.eliminarServicio(id);
        return ResponseEntity.ok("Servicio eliminado");
    }

}
