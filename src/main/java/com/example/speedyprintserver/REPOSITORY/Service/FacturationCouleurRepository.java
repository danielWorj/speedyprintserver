package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Couleur;
import com.example.speedyprintserver.ENTITY.Service.FacturationCouleur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacturationCouleurRepository extends JpaRepository<FacturationCouleur,Integer> {
    List<FacturationCouleur> findByCouleur(Couleur couleur);
}
