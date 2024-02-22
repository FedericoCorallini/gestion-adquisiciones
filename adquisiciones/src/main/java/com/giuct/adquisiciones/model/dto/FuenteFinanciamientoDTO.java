package com.giuct.adquisiciones.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class FuenteFinanciamientoDTO {
    private Long id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaAcreditacion;
    private float monto;
    private String motivo;
}
