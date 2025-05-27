package com.example.speedyprintserver.REPOSITORY.Abonnement;


import com.example.speedyprintserver.ENTITY.Abonnement.Abonnement;
import com.example.speedyprintserver.ENTITY.Abonnement.Offre;
import com.example.speedyprintserver.ENTITY.User.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement,Integer> {
    List<Abonnement> findByClient(Client client);
    List<Abonnement> findByOffre(Offre offre);

    @Query(value = "SELECT a FROM Abonnement a WHERE a.date BETWEEN :dateDebut and :dateFin")
    List<Abonnement> findAbonnementActifBetweenTwoDate(@Param("dateDebut") LocalDate dateDebut , @Param("dateFin") LocalDate dateFin);

    @Query(value = "SELECT a FROM Abonnement a WHERE a.date <= :dateFin")
    List<Abonnement> findAbonnementActifWithDateBefore(@Param("dateFin") LocalDate dateFin);

    //@Query(value = "SELECT a FROM Abonnement a JOIN a.client c WHERE c.idClient=:idClient AND a.date <= :dateFin")

}
