package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class ModeImpressionDTO {
    private Integer idModeImpression ;
    private String intitule ;
    private String description ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;
    private Integer service ;

}
