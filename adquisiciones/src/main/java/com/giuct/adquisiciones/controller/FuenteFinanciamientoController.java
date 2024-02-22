package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.dto.FuenteFinanciamientoDTO;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.service.FinanciamientoService;
import org.modelmapper.ModelMapper;
import org.springframework.boot.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("fuentes-financiamiento")
@CrossOrigin
public class FuenteFinanciamientoController {

    FinanciamientoService financiamientoService;
    ModelMapper modelMapper;

    public FuenteFinanciamientoController(FinanciamientoService financiamientoService, ModelMapper modelMapper) {
        this.financiamientoService = financiamientoService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuenteFinanciamientoDTO> getFuenteFinanciamiento(@PathVariable Long id){
        return ResponseEntity.ok(modelMapper.map(financiamientoService.getFuenteById(id), FuenteFinanciamientoDTO.class));
    }

    @GetMapping
    public ResponseEntity<Page<FuenteFinanciamientoDTO>> getFuentesFinanciamiento(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(name = "ordenar", required = false, defaultValue = "id") String criterio,
            @RequestParam(name="pagina", required = false, defaultValue = "0") Integer nroPagina,
            @RequestParam(name="elementos", required = false, defaultValue = "0") Integer nroElementos){
        Page<FuenteFinanciamiento> fuenteFinanciamientoPage = financiamientoService.getFuentes(jwt, nroPagina, nroElementos, criterio);

        List<FuenteFinanciamientoDTO> fuenteFinanciamientoDTOs = fuenteFinanciamientoPage.getContent()
                .stream()
                .map(f -> modelMapper.map(f, FuenteFinanciamientoDTO.class))
                .toList();

        return ResponseEntity.ok(new PageImpl<>(fuenteFinanciamientoDTOs, fuenteFinanciamientoPage.getPageable(), fuenteFinanciamientoPage.getTotalElements()));
    }

    @PostMapping
    public ResponseEntity<String> agregarFuenteFinanciamiento(@RequestBody FuenteFinanciamiento fuenteFinanciamiento){
        financiamientoService.crear(fuenteFinanciamiento);
        return ResponseEntity.ok("Financiamiento creado");
    }
}
