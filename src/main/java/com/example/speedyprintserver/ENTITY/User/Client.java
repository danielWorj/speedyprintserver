package com.example.speedyprintserver.ENTITY.User;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
@DiscriminatorValue("client")

public class Client extends Utilisateur {
    private String bankCard;
    private Boolean origin ;//1 => mobile and 0 => presentiel
}
