package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

public class FuenteFinanciamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "fecha_acreditacion")
    private Date fechaAcreditacion;
    @Column(name = "monto")
    private float monto;
    @Column(name = "motivo")
    private String motivo;
}
