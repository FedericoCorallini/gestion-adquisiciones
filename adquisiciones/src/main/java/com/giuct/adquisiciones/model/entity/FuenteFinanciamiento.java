package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Data
@Entity
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
