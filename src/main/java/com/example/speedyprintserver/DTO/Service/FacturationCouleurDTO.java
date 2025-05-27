package com.example.speedyprintserver.DTO.Service;

import lombok.Data;

@Data
public class FacturationCouleurDTO {
    private  Integer idFacturationCouleur;
    private Integer couleur ;

    private Double valeurAjout ;
    private Double valeurMultiplication ;
    //mod 21/05/025
    private Integer borneInferieure ;
    private Integer borneSuperieure ;
}
