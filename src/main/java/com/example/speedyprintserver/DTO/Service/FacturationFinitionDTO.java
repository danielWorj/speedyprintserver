package com.example.speedyprintserver.DTO.Service;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;


@Data
public class FacturationFinitionDTO {
    private  Integer idFacturationFinition;

    private Integer finition ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;
    //21/05/025
    private Integer borneInferieure ;
    private Integer borneSuperieure ;

}
