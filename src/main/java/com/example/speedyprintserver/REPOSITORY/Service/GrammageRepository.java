package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Grammage;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.Service.TypePapier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrammageRepository extends JpaRepository<Grammage,Integer> {
    List<Grammage> findByService(Service service);

}
