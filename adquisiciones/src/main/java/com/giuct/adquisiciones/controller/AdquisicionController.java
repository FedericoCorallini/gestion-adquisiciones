package com.giuct.adquisiciones.controller;

import java.util.Map;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.service.AdquisicionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("{adquisiciones}")
public class AdquisicionController {

    private final Map<String, AdquisicionService> serviceMap;

    public AdquisicionController(Map<String, AdquisicionService> service) {
        this.serviceMap = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<? extends Adquisicion> getAdquisiciones(@PathVariable String adquisiciones, @PathVariable Long id){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        return ResponseEntity.ok(adquisicionService.getAdquisicionById(id));
    }

    @GetMapping
    public ResponseEntity<Page<? extends Adquisicion>> getAdquisicion(
            @PathVariable String adquisiciones,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        return ResponseEntity.ok(adquisicionService.getAdquisicion(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<Page<? extends Adquisicion>> getAdquisicionesByFinanciamiento(
            @PathVariable String adquisiciones,
            @PathVariable Long idFinanciamiento,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        return ResponseEntity.ok(adquisicionService.getAdquisicionesByFinanciamiento(idFinanciamiento, criterio, nroPagina, nroElementos));
    }

    @PostMapping("/{idFinanciamiento}")
    public ResponseEntity<String> agregarAdquisicion(@PathVariable String adquisiciones, @RequestBody AdquisicionDTO adquisicionDTO, @PathVariable Long idFinanciamiento){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        adquisicionService.agregarAdquisicion(adquisicionDTO, idFinanciamiento);
        return ResponseEntity.ok("Adquisicion agregada");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarAdquisicion(@PathVariable String adquisiciones, @RequestBody AdquisicionDTO adquisicionDTO, @PathVariable Long id){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        adquisicionService.modificarAdquisicion(id, adquisicionDTO);
        return ResponseEntity.ok("Adquisicion modificada");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAdquisicion(@PathVariable String adquisiciones, @PathVariable Long id){
        final AdquisicionService adquisicionService = getService(adquisiciones);
        adquisicionService.eliminarAdquisicion(id);
        return ResponseEntity.ok("Adquisicion eliminada");
    }
    private AdquisicionService getService(String servicio){
        return serviceMap.get(servicio);
    }

}
