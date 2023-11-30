package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Equipamiento;
import com.giuct.adquisiciones.service.EquipamientoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin
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
    public ResponseEntity<Page<Equipamiento>> getEquipamientos(
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(equipamientoService.getEquipamientos(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<Page<Equipamiento>> getEquipamientosByFinanciamiento(
            @PathVariable Long idFinanciamiento,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(equipamientoService.getEquipamientosByFinanciamiento(idFinanciamiento, criterio, nroPagina, nroElementos));
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

}
