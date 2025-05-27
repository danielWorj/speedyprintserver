package com.example.speedyprintserver.CONTROLLER.Commande;

import com.example.speedyprintserver.DTO.Commande.CommandeDTO;
import com.example.speedyprintserver.DTO.Commande.ConceptionCommandeDTO;
import com.example.speedyprintserver.DTO.Commande.ImageCommandeDTO;
import com.example.speedyprintserver.ENTITY.Commande.*;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/speedyprint/commande/")
@CrossOrigin("*")
public interface ControllerCommandeInterface {

    @GetMapping("/getdto")
    ResponseEntity<CommandeDTO> fetcgDto();
    @GetMapping("/all")
    ResponseEntity<List<Commande>> findAllCommande();
    @GetMapping("/findById/{idCommande}")
    ResponseEntity<Commande> findByIdCommande(@PathVariable Integer idCommande);
    @GetMapping("/allbyClient/{idClient}")
    ResponseEntity<List<Commande>> findAllCommandeByClient(@PathVariable Integer idClient);
    @GetMapping("/etat/change/{idCommande}/{idEtat}")
    ResponseEntity<ServerResponse> changeEtatCommande(@PathVariable Integer idCommande , @PathVariable Integer idEtat);
    @PostMapping("/bypc/create/file")
    ResponseEntity<ServerResponse> createCommande(@RequestParam("commande") String commande ,@RequestParam("file") MultipartFile file, @RequestParam("fileVerso") MultipartFile fileVerso) throws IOException;
    @GetMapping("/delete/{idCommande}")
    ResponseEntity<ServerResponse> deleteCommande(@PathVariable Integer idCommande);
    //Etat commande
    @GetMapping("/etat/all")
    ResponseEntity<List<EtatCommande>> findALLEtatCommande();
    @PostMapping("/bymob/create")
    ResponseEntity<Commande> createCommandeFromMobile(CommandeDTO commandeDTO);
    @PostMapping("/sendImage")
    ResponseEntity<ServerResponse> addImageByCommande(@RequestParam("file")MultipartFile file) throws IOException;
    @GetMapping("/count")
    ResponseEntity<Integer> countAllCommande();
    @GetMapping("/count/byorigin/mob")
    ResponseEntity<Long> countAllByOriginMob();
    @GetMapping("/allservice/list")
    ResponseEntity<List<String>> findAllServiceCommande();

    @GetMapping("/allservice/count")
    ResponseEntity<List<Integer>> findAllCountGroupByService();

    //Graph
    @GetMapping("/list/intitule/service/bymonth")
    ResponseEntity<List<String>> findListServiceGroupByMonth();
    @GetMapping("/list/quantite/service/bymonth")
    ResponseEntity<List<Long>> findQteServiceGroupByMonth();

    @GetMapping("/list/month")
    ResponseEntity<List<String>> countGroupByMonth();
    @GetMapping("/list/quantite/bymonth")
    ResponseEntity<List<Long>> countCommandeGroupByMonth();

    @PostMapping("/imagecomande/create")
    ResponseEntity<ServerResponse> createImageCommande(ImageCommandeDTO imageCommandeDTO);
    @GetMapping("/imagecommande/bycommande/{idCommande}")
    ResponseEntity<List<ImageCommande>> findAllImageByCommande(@PathVariable Integer idCommande);

    //Livraison

    @GetMapping("/livraison/all")
    ResponseEntity<List<Livraison>> findAllLivraison();

    @GetMapping("/livraison/byclient/{idClient}")
    ResponseEntity<List<Livraison>> findAllLivraisonByClient(@PathVariable Integer idClient);
    @PostMapping("/livraison/create")
    ResponseEntity<ServerResponse> creatLivraison(@RequestParam("livraison") String livraison) throws JsonProcessingException;

    @GetMapping("/livraison/delete/{idLivraison}")
    ResponseEntity<ServerResponse> deleteLivraison(@PathVariable Integer idLivraison);
    @GetMapping("/livraison/count")
    ResponseEntity<Long> countLivraison();
    @GetMapping("/livraison/allservice/list")
    ResponseEntity<List<String>> allLivraisonService();
    @GetMapping("/livraison/allservice/count")
    ResponseEntity<List<Long>> allQteLivraison();
    @GetMapping("/livraison/bymonth")
    ResponseEntity<List<String>> findLivraisonByMonth();

    @GetMapping("/livraison/listqte/bymonth")
    ResponseEntity<List<Long>> findQteLivraisonByMonth();

    @GetMapping("/livraison/month")
    ResponseEntity<List<String>> findGroupLivraisonByMonth();

    ///Conception Commande

    @GetMapping("/conception/commande/all/bycommande/{idCommande}")
    ResponseEntity<List<ConceptionCommande>> findAllConceptionByCommande(@PathVariable Integer idCommande);
    @GetMapping("/conception/commande/all/byclient/{idClient}")
    ResponseEntity<List<ConceptionCommande>> findAllConceptionByClient(@PathVariable Integer idClient);
    @PostMapping("/conception/commande/create")
    ResponseEntity<ServerResponse> createConceptionCommande(@RequestParam("conceptioncommande") String conceptionCommande ,@RequestParam("file") MultipartFile file) throws IOException;

    @PostMapping("/conception/commande/avis")
    ResponseEntity<ServerResponse> avisConceptionCommande(ConceptionCommandeDTO conceptionCommandeDTO) throws JsonProcessingException;


    @PostMapping("/conception/commande/update")
    ResponseEntity<ServerResponse> updateConceptionCommande(@RequestParam("conceptioncommande") String conceptionCommande , @RequestParam("file") MultipartFile file);
    @GetMapping("/conception/commande/delete/{idConception}")
    ResponseEntity<ServerResponse> deleteConceptionCommande(@PathVariable Integer idConception);



}
