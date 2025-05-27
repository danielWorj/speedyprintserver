package com.example.speedyprintserver.ENTITY.Service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Conception {
    //prix de la conception en fonction du service
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idConception ;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TypeConception typeConception ;

    private Double montant ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Service service ;
}
