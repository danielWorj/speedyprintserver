package com.example.speedyprintserver.ENTITY.Commande;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class ReponseConception {
    //Cette classe concerentev els différents problème qu'on pourrait rencontrer lorsqu'on a recu sa conception
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReponse;
    private String intitule ;
    private String description;

}
