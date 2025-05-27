package com.example.speedyprintserver.DTO.Commande;

import com.example.speedyprintserver.ENTITY.Commande.EtatCommande;
import com.example.speedyprintserver.ENTITY.Service.Dimension;
import com.example.speedyprintserver.ENTITY.Service.Format;
import com.example.speedyprintserver.ENTITY.Service.ModeImpression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CommandeDTO {

    private Integer idCommande ;
    private Integer quantite ;
    private String dateLivraison ;
    private LocalDate dateCreation ;
    private Boolean origin ; //1 => app ; 0 => in presentie
    private String description;
    private Integer service ;

    private Integer client ;

    private Integer etatCommande;

    private Integer modeImpression;

    private Integer dimension;

    private Integer format;

    private Integer conception ;

    private Integer impression ;
    private Integer typePapier ;
    private Integer face ;//package commùande
    private Integer grammage ;
    private Integer finition ;
    private Integer couleur ;
    private Integer forme ;


}
