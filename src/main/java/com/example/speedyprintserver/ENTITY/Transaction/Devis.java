package com.example.speedyprintserver.ENTITY.Transaction;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDevis ;

    private String conception ;
    private Double montant ;
}
