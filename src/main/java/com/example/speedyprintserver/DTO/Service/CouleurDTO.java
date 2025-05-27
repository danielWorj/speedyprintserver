package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class CouleurDTO {
    private Integer idCouleur ;
    private String intitule ;
    private Integer service ;
}
