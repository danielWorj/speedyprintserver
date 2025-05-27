package com.example.speedyprintserver.ENTITY.Service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class TypePapier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTypePapier ;
    private String intitule ;
    private Double valeurAjout ;
    private Double valeurMultiplication ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Service service ;
}
