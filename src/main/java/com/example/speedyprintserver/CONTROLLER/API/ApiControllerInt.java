package com.example.speedyprintserver.CONTROLLER.API;

import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/speedyprint/othersapi/")
@CrossOrigin("*")
public interface ApiControllerInt {
    @PostMapping("/mail/sender")
    ResponseEntity<ServerResponse> sendMailToClientEndConception(@RequestParam("mail") String message) throws JsonProcessingException;
}
