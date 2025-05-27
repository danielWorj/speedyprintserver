package com.example.speedyprintserver.ENTITY.Service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class FacturationFinition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFacturationFinition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Finition finition ;

    private Double valeurAjout ;
    private Double valeurMultiplication ;
    //mod 21/05/025
    private Integer borneInferieure ;
    private Integer borneSuperieure ;
}
