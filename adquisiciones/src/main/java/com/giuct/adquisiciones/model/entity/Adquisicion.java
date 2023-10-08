package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data @Getter @AllArgsConstructor
public abstract class Adquisicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "costo")
    private float costo;
    @Column(name = "descripcion")
    private String descripcion;
}
