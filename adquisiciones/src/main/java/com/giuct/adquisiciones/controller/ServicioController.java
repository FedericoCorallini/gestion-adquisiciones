package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.service.ServicioService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("servicios")
public class ServicioController {

    ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerServiciosList(@PathVariable Long id){
        Servicio servicio = servicioService.getServicioById(id);
        return ResponseEntity.ok(servicio);
    }

    @GetMapping
    public ResponseEntity<Page<Servicio>> getServicios(
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(servicioService.getServicios(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<Page<Servicio>> getBibliografiasByFinanciamiento(
            @PathVariable Long idFinanciamiento,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(servicioService.getServiciosByFinanciamiento(idFinanciamiento, criterio, nroPagina, nroElementos));
    }

    @PostMapping("/{idFinanciamiento}")
    public ResponseEntity<String> crearServicio(@RequestBody Servicio servicio, @PathVariable Long idFinanciamiento){
        servicioService.agregarServicio(servicio, idFinanciamiento);
        return ResponseEntity.ok("Servicio creado");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarServicio(@RequestBody Servicio servicio, @PathVariable Long id){
        this.servicioService.modificarServicio(id, servicio);
        return ResponseEntity.ok("Servicio modificado");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> modificarServicio(@PathVariable Long id){
        servicioService.eliminarServicio(id);
        return ResponseEntity.ok("Servicio eliminado");
    }

}
