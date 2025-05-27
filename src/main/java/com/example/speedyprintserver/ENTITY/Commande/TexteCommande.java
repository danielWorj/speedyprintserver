package com.example.speedyprintserver.ENTITY.Commande;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class TexteCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTexteService ;
    private String texte ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Commande commande ;
}
