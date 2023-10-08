package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;

public class Servicio extends Adquisicion {
    @Column(name = "tipo")
    private String tipo;

}
