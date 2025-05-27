package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Dimension;
import com.example.speedyprintserver.ENTITY.Service.ModeImpression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DimensionRepository extends JpaRepository<Dimension,Integer> {
    List<Dimension> findByService(Service service);

}
