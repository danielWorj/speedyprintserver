package com.example.speedyprintserver.ENTITY.Facturation;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class Prix {
    //Ce sont les prixs d'un standard particulier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPrix;
    private Double prix;
    private Double quantite ;
    private float pourcentage ;
}
