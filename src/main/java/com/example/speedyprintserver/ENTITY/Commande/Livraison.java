package com.example.speedyprintserver.ENTITY.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
@Data
public class Livraison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLivraison ;
    private String destination ;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Commande commande;
    private LocalDate localDate;
    private Boolean etat ; //Livré et Non livré
}
