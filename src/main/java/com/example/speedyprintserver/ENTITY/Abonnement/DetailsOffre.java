package com.example.speedyprintserver.ENTITY.Abonnement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class DetailsOffre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetailOffre;
    private String intitule ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Offre offre;
}
