package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Licencia;
import com.giuct.adquisiciones.service.LicenciaService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("licencias")
@CrossOrigin(origins = "http://localhost:3000")
public class LicenciaController {
    public final LicenciaService licenciaService;

    public LicenciaController(LicenciaService licenciaService) {
        this.licenciaService = licenciaService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Licencia> getLicencia(@PathVariable Long id){
        return ResponseEntity.ok(licenciaService.getLicenciaById(id));
    }

    @GetMapping
    public ResponseEntity<Page<Licencia>> getLicencias(
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(licenciaService.getLicencias(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<Page<Licencia>> getLicenciasByFinanciamiento(
            @PathVariable Long idFinanciamiento,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(licenciaService.getLicenciasByFinanciamiento(idFinanciamiento, criterio, nroPagina, nroElementos));
    }

    @PostMapping("/{idFinanciamiento}")
    public ResponseEntity<String> agregarLicencia(@RequestBody Licencia licencia, @PathVariable Long idFinanciamiento){
        this.licenciaService.agregarLicencia(licencia, idFinanciamiento);
        return ResponseEntity.ok("Licencia agregada");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarLicencia(@RequestBody Licencia licencia, @PathVariable Long id){
        this.licenciaService.modificarLicencia(id, licencia);
        return ResponseEntity.ok("Licencia modificada");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEquipamiento(@PathVariable Long id){
        this.licenciaService.eliminarLicencia(id);
        return ResponseEntity.ok("Licencia eliminada");
    }
}
