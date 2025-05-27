package com.example.speedyprintserver.DTO.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class ImageCommandeDTO {
    private Integer idImage ;
    private String url ;
    private Integer face ;
    private Integer commande ;
}
