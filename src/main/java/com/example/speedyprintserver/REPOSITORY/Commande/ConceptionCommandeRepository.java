package com.example.speedyprintserver.REPOSITORY.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.example.speedyprintserver.ENTITY.Commande.ConceptionCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConceptionCommandeRepository extends JpaRepository<ConceptionCommande,Integer> {
    List<ConceptionCommande> findByCommande(Commande commande);
    @Query(value = "SELECT cc FROM ConceptionCommande cc JOIN cc.commande c JOIN c.client cl WHERE cl.idUser=:idUser ORDER BY cc.idConception DESC")
    List<ConceptionCommande> findAllConceptionCommandeByClient(@Param("idUser") Integer idClient);
}
