package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@MappedSuperclass
public abstract class Adquisicion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "costo")
    protected float costo;

    @Column(name = "descripcion")
    protected String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_fuente_financiamiento")
    protected FuenteFinanciamiento fuenteFinanciamiento;

}
