package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Data
public class FaceDTO {
    private Integer idFace;
    private String intitule ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;
    private Integer service ;
}
