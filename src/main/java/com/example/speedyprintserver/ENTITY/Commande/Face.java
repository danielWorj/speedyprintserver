package com.example.speedyprintserver.ENTITY.Commande;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class Face {
    //classe recto / recto-verso
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFace ;
    private String intitule ;
}
