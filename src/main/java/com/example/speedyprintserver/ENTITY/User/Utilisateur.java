package com.example.speedyprintserver.ENTITY.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser ;
    private String nomUtilisateur ;
    private String email ;
    private String contact ;
    private String password ;
}
