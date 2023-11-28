package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.service.BibliografiaService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bibliografias")
@CrossOrigin(origins = "http://localhost:3000")
public class BibliografiaController {
    public final BibliografiaService bibliografiaService;

    public BibliografiaController(BibliografiaService bibliografiaService) {
        this.bibliografiaService = bibliografiaService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bibliografia> getBibliografia(@PathVariable Long id){
        return ResponseEntity.ok(bibliografiaService.getBibliografiaById(id));
    }

    @GetMapping
    public ResponseEntity<Page<Bibliografia>> getBibliografias(
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(bibliografiaService.getBibliografias(nroPagina, nroElementos, criterio));
    }

    @GetMapping("/financiamiento/{idFinanciamiento}")
    public ResponseEntity<Page<Bibliografia>> getBibliografiasByFinanciamiento(
            @PathVariable Long idFinanciamiento,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        return ResponseEntity.ok(bibliografiaService.getBibliografiasByFinanciamiento(idFinanciamiento, criterio, nroPagina, nroElementos));
    }

    @PostMapping("/{idFinanciamiento}")
    public ResponseEntity<String> agregarBibliografia(@RequestBody Bibliografia bibliografia, @PathVariable Long idFinanciamiento){
        this.bibliografiaService.agregarBibliografia(bibliografia, idFinanciamiento);
        return ResponseEntity.ok("Bibliografia agregada");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarBibliografia(@RequestBody Bibliografia bibliografia, @PathVariable Long id){
        this.bibliografiaService.modificarBibliografia(id, bibliografia);
        return ResponseEntity.ok("Bibliografia modificada");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarBibliografia(@PathVariable Long id){
        this.bibliografiaService.eliminarBibliografia(id);
        return ResponseEntity.ok("Bibliografia eliminada");
    }
}
