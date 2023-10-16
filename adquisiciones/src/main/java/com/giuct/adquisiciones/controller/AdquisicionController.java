package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.service.ServicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdquisicionController {

    ServicioService servicioService;

    public AdquisicionController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping("/servicios")
    public ResponseEntity<List<Servicio>> getServiciosList(){
        return ResponseEntity.ok(servicioService.getServicios());
    }

    /*
    @GetMapping("/servicios/{id}")
    public ResponseEntity<Optional<Servicio>> obtenerServiciosList(@PathVariable Long id){
        Optional<Servicio> servicio = servicioService.obtenerServicioById(id);
        return ResponseEntity.ok(servicio);
    }
    */


    @GetMapping("/servicios/{id}")
    public ResponseEntity<Servicio> obtenerServiciosList(@PathVariable Long id){
        Servicio servicio = servicioService.getServicioById(id);
        return ResponseEntity.ok(servicio);
    }


    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<List<Servicio>> getServiciosPorFinanciamiento(@PathVariable Long idFinanciamiento){
        List<Servicio> servicio = servicioService.getByFinanciamiento(idFinanciamiento);
        return ResponseEntity.ok(servicio);
    }

    @PostMapping("/servicios")
    public ResponseEntity<String> crearAdquisicion(@RequestBody Servicio servicio){
        servicioService.agregarServicio(servicio);
        return ResponseEntity.ok("Adquisicion creada");
    }

    @PutMapping("/servicios/{id}")
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

    @DeleteMapping("/servicios/{id}")
    public ResponseEntity<String> modificarServicio(@PathVariable Long id){
        servicioService.eliminarServicio(id);
        return ResponseEntity.ok("Servicio eliminado");
    }

}
