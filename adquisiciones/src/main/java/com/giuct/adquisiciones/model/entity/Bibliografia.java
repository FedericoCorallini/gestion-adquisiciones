package com.giuct.adquisiciones.model.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Bibliografia extends Adquisicion{

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "anio_publicacion")
    private LocalDate anioPublicacion;

    @Column(name = "apellido_autor")
    private String apellidoAutor;

    @Column(name = "editorial")
    private String editorial;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "issn")
    private String issn;

    @Column(name = "nombre_autor")
    private String nombreAutor;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "url")
    private String url;


}
