package com.example.speedyprintserver.REPOSITORY.Service;


import com.example.speedyprintserver.ENTITY.Service.FacturationFinition;
import com.example.speedyprintserver.ENTITY.Service.Finition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacturationFinitionRepository extends JpaRepository<FacturationFinition,Integer> {
    List<FacturationFinition> findByFinition(Finition finition);
}
