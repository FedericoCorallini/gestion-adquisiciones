package com.giuct.adquisiciones.model.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Licencia extends Adquisicion{

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "anio")
    private LocalDate anio;

    @Column(name = "fabricante")
    private String fabricante;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_otorgamiento")
    private LocalDate fechaOtorgamiento;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "numero_release")
    private String numeroRelease;

    @Column(name = "version")
    private String version;


}
