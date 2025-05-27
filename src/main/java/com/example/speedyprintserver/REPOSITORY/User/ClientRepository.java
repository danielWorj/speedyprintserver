package com.example.speedyprintserver.REPOSITORY.User;

import com.example.speedyprintserver.ENTITY.User.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client,Integer> {
    @Query(value = "SELECT c FROM Client c ORDER BY c.idUser DESC LIMIT 1")
    Client lastClientCreated();


}
