package com.giuct.adquisiciones.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AdquisicionDTO {
    private Long id;
    @Positive
    private float costo;
    @NotBlank
    private String descripcion;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate anioPublicacion;

    private String apellidoAutor;
    private String editorial;
    private String isbn;
    private String issn;
    private String nombreAutor;
    private String tipo;
    private String titulo;
    private String url;
    private String denominacion;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaIncorporacion;

    @DateTimeFormat(pattern = "yyyy-MM-dd")

    private LocalDate anio;
    private String fabricante;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaOtorgamiento;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaVencimiento;

    private String nombre;
    private String numeroRelease;
    private String version;
}
