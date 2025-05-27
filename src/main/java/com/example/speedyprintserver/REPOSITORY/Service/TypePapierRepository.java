package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.Service.TypePapier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TypePapierRepository extends JpaRepository<TypePapier,Integer> {
    List<TypePapier> findByService(Service service);
}
