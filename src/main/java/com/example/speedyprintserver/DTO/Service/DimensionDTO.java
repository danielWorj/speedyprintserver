package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class DimensionDTO {

    private Integer idDimension;
    private String intitule ;
    private String taille ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;
    private Integer service ;

}
