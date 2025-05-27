package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class FormatDTO {

    private Integer idFormat ;
    private String intitule ;
    private Integer service ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;
}
