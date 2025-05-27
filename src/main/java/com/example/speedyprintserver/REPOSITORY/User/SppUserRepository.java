package com.example.speedyprintserver.REPOSITORY.User;

import com.example.speedyprintserver.ENTITY.User.SppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SppUserRepository extends JpaRepository<SppUser,Integer> {
}
