package com.example.speedyprintserver.ENTITY.Commande;

import com.example.speedyprintserver.ENTITY.Service.Faces;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.IdGeneratorType;

@Entity
@Table
@Data
public class ImageCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idImage ;
    private String url ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Faces faces ; //Recto Verso

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Commande commande ;
}
