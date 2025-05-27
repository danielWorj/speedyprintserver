package com.example.speedyprintserver.ENTITY.Service;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class CategorieService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCategorieService ;
    private String intitule ;
    private String image ;
}
