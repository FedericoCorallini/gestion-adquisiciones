package com.giuct.adquisiciones.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Equipamiento extends Adquisicion{

    @Column(name = "denominacion")
    private String denominacion;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_incorporacion")
    private LocalDate fechaIncorporacion;


}
