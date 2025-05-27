package com.example.speedyprintserver.ENTITY.Service;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.Data;

@Entity
@Table
@Data
public class ModeImpression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idModeImpression ;
    private String intitule ;
    private String description ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Service service ;
}
