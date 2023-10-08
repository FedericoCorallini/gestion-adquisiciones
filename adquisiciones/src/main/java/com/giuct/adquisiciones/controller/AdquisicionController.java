package com.giuct.adquisiciones.controller;

import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Servicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AdquisicionController {

    List<Adquisicion> adquisicionList = new ArrayList<>();
    Adquisicion adquisicion1 = new Servicio();
    adquisicionList.add(adquisicion1);

    GetMapping("/adquisiciones")
    public ResponseEntity<List<Adquisicion>> getAdquisicionList(){
        return ResponseEntity.ok(adquisicionList);
    }

    PostMapping("/adquisiciones/crear")
    public ResponseEntity<String> crearAdquisicion(@RequestBody Adquisicion adquisicion){
        adquisicionList.add(adquisicion);
        return ResponseEntity.ok("Adquisicion creada");
    }

    DeleteMapping("/adquisiciones/{id}")
    public ResponseEntity<String> eliminarAdquisicion(@PathVariable id){
        Optional<Adquisicion> adquisicion = adquisicionList.stream()
                .filter(a -> a.getId.equals(id))
                .findFirst();
        if (adquisicion.isPresent()){
            adquisicionList.remove(adquisicion.get());
            return ResponseEntity.ok("Adquisicion eliminada");
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }



}
