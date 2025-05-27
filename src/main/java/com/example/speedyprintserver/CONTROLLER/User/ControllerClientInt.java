package com.example.speedyprintserver.CONTROLLER.User;

import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/speedyprint/client/")
@CrossOrigin("*")
public interface ControllerClientInt {
    @GetMapping("/all")
    ResponseEntity<List<Client>> getAllClient();
    @PostMapping("/create")
    ResponseEntity<ServerResponse> createClient(@RequestParam("client") String client) throws JsonProcessingException;
    @PostMapping("/update")
    ResponseEntity<ServerResponse> updateClient(@RequestParam("client") String client) throws JsonProcessingException;
    @GetMapping("/delete/{idClient}")
    ResponseEntity<ServerResponse> deleteClient(@PathVariable Integer idClient);

    @PostMapping("/create/bymobile")
    ResponseEntity<Client> createClientByMobile(Client client);
    @GetMapping("/count")
    ResponseEntity<Integer> findCountCommande();
}
