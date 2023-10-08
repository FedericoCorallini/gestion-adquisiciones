package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;

import java.util.Date;

public class Equipamiento extends Adquisicion{
    @Column(name = "denominacion")
    private String denominacion;
    @Column(name = "fecha_incorporacion")
    private Date fechaIncorporacion;
}
