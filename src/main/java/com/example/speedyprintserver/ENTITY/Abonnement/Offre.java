package com.example.speedyprintserver.ENTITY.Abonnement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table
@Data
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOffre ;
    private String intitule ;
    private Double montant ;
    private Double remise ;
    @OneToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DetailsOffre> detailsOffres;
}
