package com.example.speedyprintserver.REPOSITORY.Commande;


import com.example.speedyprintserver.ENTITY.Commande.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface LivraisonRepository extends JpaRepository<Livraison,Integer> {

    @Query(value = "SELECT s.intitule FROM Livraison l JOIN l.commande c JOIN c.service s GROUP BY MONTH(l.localDate)")
    List<String> listServiceByMonth();

    @Query(value = "SELECT COUNT(*) FROM Livraison l JOIN l.commande c JOIN c.service s GROUP BY MONTH(l.localDate)")
    List<Long> listCountByMonth();

    @Query(value = "SELECT MONTHNAME(l.localDate) FROM Livraison l JOIN l.commande c JOIN c.service s GROUP BY MONTH(l.localDate)")
    List<String> listByMonthName();
    @Query(value = "SELECT s.intitule FROM Livraison l JOIN l.commande c JOIN c.service s GROUP BY s")
    List<String> listServiceLivraison();

    @Query(value = "SELECT COUNT(s) FROM Livraison l JOIN l.commande c JOIN c.service s GROUP BY s")
    List<Long> listQteServiceLivraison();

    @Query(value = "SELECT l FROM Livraison l JOIN l.commande c JOIN c.client cl WHERE cl.idUser=:idUser")
    List<Livraison> findLivraisonByClient(@RequestParam("idUser") Integer idUser);
}
