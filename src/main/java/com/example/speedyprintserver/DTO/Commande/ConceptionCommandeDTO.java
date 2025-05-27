package com.example.speedyprintserver.DTO.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ConceptionCommandeDTO {
    private Integer idConception ;
    private String date ;
    private String url ;
    private Integer commande;
    private String message ;
    private String dateMisAJour;


}
