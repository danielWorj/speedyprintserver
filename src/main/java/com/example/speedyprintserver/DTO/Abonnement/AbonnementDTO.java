package com.example.speedyprintserver.DTO.Abonnement;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AbonnementDTO {
    private Integer idAbonnement ;

    private Integer client ;

    private Integer offre;

    private LocalDate date;
    private LocalDate dateFin;
}
