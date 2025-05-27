package com.example.speedyprintserver.REPOSITORY.Abonnement;


import com.example.speedyprintserver.ENTITY.Abonnement.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OffreRepository extends JpaRepository<Offre,Integer> {
    @Query(value = "SELECT o FROM Offre o ORDER BY o.idOffre DESC LIMIT 1")
    Offre findLastOffreCreated();
}
