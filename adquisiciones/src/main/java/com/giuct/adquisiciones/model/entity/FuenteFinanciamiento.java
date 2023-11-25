package com.giuct.adquisiciones.model.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "fuente_financiamiento")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class FuenteFinanciamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_acreditacion")
    private LocalDate fechaAcreditacion;

    @Column(name = "monto")
    private float monto;

    @Column(name = "motivo")
    private String motivo;

}
