package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Equipamiento extends Adquisicion{

    @Column(name = "denominacion")
    private String denominacion;
    @Column(name = "fecha_incorporacion")
    private Date fechaIncorporacion;


}
