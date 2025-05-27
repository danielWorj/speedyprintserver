package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
public class ImpressionDTO {

    private Integer idImpression ;

    private Integer borneInferieure;
    private Integer borneSuperieure;
    private Double remise ;
    private Double montant ;
    private Integer service ;

    private Integer modeImpression;
    private Integer dimension;
    private Integer format;
    private Integer typePapier ;
    private Integer face ;//package commùande
    private Integer grammage ;
    private Integer finition ;
    private Integer couleur ;
    private Integer forme ;

}
