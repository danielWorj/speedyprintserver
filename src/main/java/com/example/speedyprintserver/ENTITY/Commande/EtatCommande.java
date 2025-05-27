package com.example.speedyprintserver.ENTITY.Commande;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class EtatCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEtatCommande ;
    private String intitule ;
}
