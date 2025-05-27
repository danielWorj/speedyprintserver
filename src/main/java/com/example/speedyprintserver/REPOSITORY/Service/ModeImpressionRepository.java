package com.example.speedyprintserver.REPOSITORY.Service;


import com.example.speedyprintserver.ENTITY.Service.ModeImpression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModeImpressionRepository extends JpaRepository<ModeImpression,Integer> {
    List<ModeImpression> findByService(Service service);
}
