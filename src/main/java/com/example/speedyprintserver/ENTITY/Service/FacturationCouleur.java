package com.example.speedyprintserver.ENTITY.Service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class FacturationCouleur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFacturationCouleur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Couleur couleur ;

    private Double valeurAjout ;
    private Double valeurMultiplication ;
    //mod 21/05/025
    private Integer borneInferieure ;
    private Integer borneSuperieure ;
}
