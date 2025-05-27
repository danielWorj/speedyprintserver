package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Couleur;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouleurRepository extends JpaRepository<Couleur,Integer> {
    List<Couleur> findByService(Service service);
}
