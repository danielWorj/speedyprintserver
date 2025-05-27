package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Forme;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.Service.TypePapier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormeRepository extends JpaRepository<Forme,Integer> {
    List<Forme> findByService(Service service);

}
