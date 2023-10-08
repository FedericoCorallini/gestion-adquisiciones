package com.giuct.adquisiciones.model.entity;

import jakarta.persistence.Column;

import java.util.Date;

public class Bibliografia extends Adquisicion{

    @Column(name = "anio_publicacion")
    private Date anioPublicacion;
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
