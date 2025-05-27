package com.example.speedyprintserver.DTO.Commande;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LivraisonDTO {
    private Integer idLivraison ;
    private String destination ;
    private String localDate;
    private Integer commande;
    private Boolean etat ; //Livré et Non livré
}
