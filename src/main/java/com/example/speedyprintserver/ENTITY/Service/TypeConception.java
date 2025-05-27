package com.example.speedyprintserver.ENTITY.Service;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class TypeConception {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTypeConception ;
    private String intitule ;
}
