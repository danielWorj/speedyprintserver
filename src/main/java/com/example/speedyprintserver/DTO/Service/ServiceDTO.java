package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.CategorieService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ServiceDTO {
    private Integer idServices ;
    private String intitule ;
    private String description ;
    private String image ;
    private LocalDate date;
    private Integer categorieService ;
}
