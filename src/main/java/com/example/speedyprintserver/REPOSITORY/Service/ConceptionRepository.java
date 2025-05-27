package com.example.speedyprintserver.REPOSITORY.Service;


import com.example.speedyprintserver.ENTITY.Service.Conception;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConceptionRepository extends JpaRepository<Conception,Integer> {
    List<Conception> findByService(Service service);
}
