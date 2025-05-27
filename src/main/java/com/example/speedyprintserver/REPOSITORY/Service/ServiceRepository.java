package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Service.CategorieService;
import com.example.speedyprintserver.ENTITY.Service.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service,Integer> {
    List<Service> findByCategorieService(CategorieService categorieService);


}
