package com.example.speedyprintserver.REPOSITORY.Abonnement;

import com.example.speedyprintserver.ENTITY.Abonnement.DetailsOffre;
import com.example.speedyprintserver.ENTITY.Abonnement.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailOffreRepository extends JpaRepository<DetailsOffre, Integer> {
    List<DetailsOffre> findByOffre(Offre offre);
}
