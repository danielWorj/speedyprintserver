package com.example.speedyprintserver.REPOSITORY.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.example.speedyprintserver.ENTITY.Commande.TexteCommande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TexteCommandeRepository extends JpaRepository<TexteCommande,Integer> {
    List<TexteCommande> findByCommande(Commande commande);
}
