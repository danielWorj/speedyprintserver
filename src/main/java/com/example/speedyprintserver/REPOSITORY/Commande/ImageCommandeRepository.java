package com.example.speedyprintserver.REPOSITORY.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.example.speedyprintserver.ENTITY.Commande.ImageCommande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageCommandeRepository extends JpaRepository<ImageCommande,Integer> {

    List<ImageCommande> findByCommande(Commande commande);


}
