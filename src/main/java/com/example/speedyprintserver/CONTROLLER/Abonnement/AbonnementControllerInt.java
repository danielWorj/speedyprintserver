package com.example.speedyprintserver.CONTROLLER.Abonnement;

import com.example.speedyprintserver.ENTITY.Abonnement.Abonnement;
import com.example.speedyprintserver.ENTITY.Abonnement.DetailsOffre;
import com.example.speedyprintserver.ENTITY.Abonnement.Offre;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/speedyprint/abonnement/")
@CrossOrigin("*")
public interface AbonnementControllerInt {

    @GetMapping("/all")
    ResponseEntity<List<Abonnement>> allAbonnement();
    @PostMapping("/create")
    ResponseEntity<ServerResponse> createAbonnement(@RequestParam("abonnement") String abonnement) throws JsonProcessingException;
    @PostMapping("/update")
    ResponseEntity<ServerResponse> updateAbonnement(@RequestParam("abonnement") String abonnement) throws JsonProcessingException;
    @GetMapping("/delete/{idAbonnement}")
    ResponseEntity<ServerResponse> deleteAbonnement(@PathVariable Integer idAbonnement);
    @GetMapping("/all/client/{idClient}")
    ResponseEntity<List<Abonnement>> allByClient(@PathVariable Integer idClient);

    @GetMapping("/validity/{idClient}")
    ResponseEntity<Abonnement> getValidityOfDate(@PathVariable Integer idClient);
    @GetMapping("/encours/{idClient}")
    ResponseEntity<Abonnement> getAbonnementEnCours(@PathVariable Integer idClient);
    @GetMapping("/all/offre/{idOffre}")
    ResponseEntity<List<Abonnement>> allByOffre(@PathVariable Integer idOffre);
    //Offre
    @GetMapping("/offre/all")
    ResponseEntity<List<Offre>> offres();
    @PostMapping("/offre/create")
    ResponseEntity<Offre> createOffre(@RequestParam("offre") String offre) throws JsonProcessingException;
    @PostMapping("/offre/update")
    ResponseEntity<ServerResponse> updateOffre(@RequestParam("offre") String offre) throws JsonProcessingException;
    @GetMapping("/offre/delete/{idOffre}")
    ResponseEntity<ServerResponse> deleteOffre(@PathVariable Integer idOffre);
    //Details offre
    @GetMapping("/details/offre/all/{idOffre}")
    ResponseEntity<List<DetailsOffre>> detailsOffre(@PathVariable Integer idOffre);
    @PostMapping("/details/offre/create")
    ResponseEntity<ServerResponse> createDetailsOffre(@RequestParam("details") String details) throws JsonProcessingException;
    @PostMapping("/details/offre/update")
    ResponseEntity<ServerResponse> updateDetailsOffre(@RequestParam("details") String details) throws JsonProcessingException;
    @GetMapping("/delete/{idDetails}")
    ResponseEntity<ServerResponse> deleteDetailsOffre(@PathVariable Integer idOffre);



}
