package com.example.speedyprintserver.DTO.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class ConceptionDTO {
    private Integer idConception ;
    private Integer typeConception ; //SIMPLE PRO
    private Double montant ;
    private Integer service ;
}
