package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.Format;
import com.example.speedyprintserver.ENTITY.Service.ModeImpression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormatRepository extends JpaRepository<Format,Integer> {
    List<Format> findByService(Service service);

}
