package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.Date;
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
//@DiscriminatorValue("licencia")
public class Licencia extends Adquisicion{

    @Column(name = "anio")
    private LocalDate anio;
    @Column(name = "fabricante")
    private String fabricante;
    @Column(name = "fecha_otorgamiento")
    private LocalDate fechaOtorgamiento;
    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "numero_release")
    private String numeroRelease;
    @Column(name = "version")
    private String version;


}
