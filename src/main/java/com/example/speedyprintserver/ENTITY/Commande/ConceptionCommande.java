package com.example.speedyprintserver.ENTITY.Commande;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table
@Data
public class ConceptionCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idConception ;
    private LocalDate date ;
    private String url ;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Commande commande;

    @Column(length = 100000)
    private String message ;
    private LocalDate dateMisAJour;
}
