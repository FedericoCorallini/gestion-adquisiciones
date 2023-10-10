package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "fuente_financiamiento")
public class FuenteFinanciamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "fecha_acreditacion")
    private Date fechaAcreditacion;
    @Column(name = "monto")
    private float monto;
    @Column(name = "motivo")
    private String motivo;

}
