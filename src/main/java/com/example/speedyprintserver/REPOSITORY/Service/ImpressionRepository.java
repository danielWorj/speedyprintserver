package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Impression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImpressionRepository extends JpaRepository<Impression,Integer> {
    List<Impression> findByService(Service service);

}
