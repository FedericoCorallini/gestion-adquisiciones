package com.giuct.adquisiciones.model.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaginacionOrdenamientoDTO {
    private String criterio;
    private Integer nroPagina;
    private Integer nroElementos;
}
