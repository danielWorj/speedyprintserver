package com.example.speedyprintserver.ENTITY.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
@DiscriminatorValue(value = "sppuser")
public class SppUser extends Utilisateur {

    @Enumerated(EnumType.ORDINAL)
    private SppRole sppRole;

}
