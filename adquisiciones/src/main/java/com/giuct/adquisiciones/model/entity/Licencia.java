package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;

import java.util.Date;

public class Licencia extends Adquisicion{

    @Column(name = "anio")
    private Date anio;
    @Column(name = "fabricante")
    private String fabricante;
    @Column(name = "fecha_otorgamiento")
    private Date fechaOtorgamiento;
    @Column(name = "fecha_vencimiento")
    private Date fechaVencimiento;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "numero_release")
    private String numeroRelease;
    @Column(name = "version")
    private String version;
}
