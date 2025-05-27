package com.example.speedyprintserver.REPOSITORY.Service;

import com.example.speedyprintserver.ENTITY.Commande.Face;
import com.example.speedyprintserver.ENTITY.Service.Faces;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.Service.TypePapier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacesRepository extends JpaRepository<Faces,Integer> {
    List<Faces> findByService(Service service);

}
