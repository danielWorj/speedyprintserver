package com.example.speedyprintserver.CONTROLLER.Abonnement;

import com.example.speedyprintserver.DTO.Abonnement.AbonnementDTO;
import com.example.speedyprintserver.DTO.Abonnement.DetailsOffreDTO;
import com.example.speedyprintserver.ENTITY.Abonnement.Abonnement;
import com.example.speedyprintserver.ENTITY.Abonnement.DetailsOffre;
import com.example.speedyprintserver.ENTITY.Abonnement.Offre;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.example.speedyprintserver.REPOSITORY.Abonnement.AbonnementRepository;
import com.example.speedyprintserver.REPOSITORY.Abonnement.DetailOffreRepository;
import com.example.speedyprintserver.REPOSITORY.Abonnement.OffreRepository;
import com.example.speedyprintserver.REPOSITORY.User.ClientRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
public class AbonnementControllerImpl implements AbonnementControllerInt{
    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private DetailOffreRepository detailOffreRepository;
    @Autowired
    private AbonnementRepository abonnementRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Override
    public ResponseEntity<List<Abonnement>> allAbonnement() {
        return new ResponseEntity<>(this.abonnementRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createAbonnement(String abonnement) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();
        AbonnementDTO abonnementDTO = new ObjectMapper().readValue(abonnement, AbonnementDTO.class);
        Abonnement abonnementEnCours = this.findAbonnementEnCours(abonnementDTO.getClient());

        if (Objects.nonNull(abonnementEnCours)){
            Abonnement abonnementToSave = new Abonnement();
            Offre offre = this.offreRepository.findById(abonnementDTO.getOffre()).orElse(null);
            Client client = this.clientRepository.findById(abonnementDTO.getClient()).orElse(null);

            abonnementToSave.setOffre(offre);
            abonnementToSave.setClient(client);
            abonnementToSave.setDate(LocalDate.now());
            LocalDate dateEnd = LocalDate.now().plusDays(30);
            abonnementToSave.setDateFin(dateEnd);

            this.abonnementRepository.save(abonnementToSave);

            serverResponse.setSuccess(true);
            serverResponse.setMessage("Creation Abonnement : true");
        }else {
            serverResponse.setSuccess(false);
            serverResponse.setMessage("Creation Abonnement : false");
        }


        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> updateAbonnement(String abonnement) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();
        AbonnementDTO abonnementDTO = new ObjectMapper().readValue(abonnement, AbonnementDTO.class);
        Abonnement abonnementToSave = new Abonnement();

        Abonnement abonnementEnCours = this.findAbonnementEnCours(abonnementDTO.getClient());

        if (Objects.nonNull(abonnementEnCours)){

            Abonnement abonnementFromDB = this.abonnementRepository.findById(abonnementDTO.getIdAbonnement()).orElse(null);
            Offre offre = this.offreRepository.findById(abonnementDTO.getOffre()).orElse(null);
            Client client = this.clientRepository.findById(abonnementDTO.getClient()).orElse(null);

            if (Objects.nonNull(abonnementFromDB)){
                abonnementToSave.setOffre(offre);
                abonnementToSave.setClient(client);
                abonnementToSave.setDate(LocalDate.now());

                this.abonnementRepository.save(abonnementToSave);

                serverResponse.setSuccess(true);
                serverResponse.setMessage("Creation Abonnement : true");
            }else{
                serverResponse.setSuccess(false);
                serverResponse.setMessage("Creation Abonnement : false");
            }

        }else {
            serverResponse.setSuccess(false);
            serverResponse.setMessage("Creation Abonnement : false");
        }
        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteAbonnement(Integer idAbonnement) {
        ServerResponse serverResponse = new ServerResponse();
        this.abonnementRepository.deleteById(idAbonnement);
        serverResponse.setMessage("Delete abonnement : true");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Abonnement>> allByClient(Integer idClient) {
        Client client = this.clientRepository.findById(idClient).orElse(null);
        return new ResponseEntity<>(this.abonnementRepository.findByClient(client),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Abonnement>> allByOffre(Integer idOffre) {
        Offre offre = this.offreRepository.findById(idOffre).orElse(null);
        return new ResponseEntity<>(this.abonnementRepository.findByOffre(offre),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Abonnement> getValidityOfDate(Integer idClient) {

        /**LocalDate dateActuelle = LocalDate.now();

        Client client = this.clientRepository.findById(idClient).orElse(null);
        List<Abonnement> abonnements = this.abonnementRepository.findByClient(client);
        Abonnement abonnementValidate = new Abonnement();
        //List<LocalDate> dateDebut =  new ArrayList<>();
        List<LocalDate> dateFin =  new ArrayList<>() ;
        float d=0;
        Duration duration ;

        for (int i = 0; i < abonnements.size(); i++) {
            //dateDebut.add(abonnements.get(i).getDate());
            dateFin.add(abonnements.get(i).getDateFin());
        }
        System.out.println(dateFin);

        //Il faut noter que la durée d ne sera que sur un seul abonnement car un client n'a qu'un seul abonnement à la fois
        int indexAbonnementValide =0;

        for (int i = 0; i < abonnements.size(); i++) {

            System.out.println(dateActuelle);
            System.out.println(dateFin.get(i));

            //long daysBetween = start.until(dateFin.get(i), LocalDate.now());

            d = (float) ChronoUnit.DAYS.between(dateActuelle, dateFin.get(i));

            if (d>0 && d<=30){
                abonnementValidate = abonnements.get(i);
            }
            System.out.println("duration :"+d);
        }



        System.out.println("Abonnement valide : "+abonnementValidate.toString());**/

        return new ResponseEntity<>(null,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Abonnement> getAbonnementEnCours(Integer idClient) {
        Abonnement abonnementEnCours = findAbonnementEnCours(idClient);
       return new ResponseEntity<>(abonnementEnCours,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Offre>> offres() {

        return new ResponseEntity<>(this.offreRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Offre> createOffre(String offre) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        Offre offreFromFrontEnd = new ObjectMapper().readValue(offre, Offre.class);
        this.offreRepository.save(offreFromFrontEnd);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("Offre creation : true");

        Offre offreLastCreated = this.offreRepository.findLastOffreCreated();

        return new ResponseEntity<>(offreLastCreated,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> updateOffre(String offre) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        Offre offreFromFrontEnd = new ObjectMapper().readValue(offre, Offre.class);
        Offre offreFromDB = this.offreRepository.findById(offreFromFrontEnd.getIdOffre()).orElse(null);

        if (Objects.nonNull(offreFromDB)){
            this.offreRepository.save(offreFromFrontEnd);
            serverResponse.setSuccess(true);
            serverResponse.setMessage("Offre creation : true");
        }else{
            serverResponse.setSuccess(false);
            serverResponse.setMessage("Offre creation : failed");

        }


        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteOffre(Integer idOffre) {
        ServerResponse serverResponse = new ServerResponse();
        this.offreRepository.deleteById(idOffre);
        serverResponse.setSuccess(true);
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<DetailsOffre>> detailsOffre(Integer idOffre) {
        Offre offre = this.offreRepository.findById(idOffre).orElse(null);

        return new ResponseEntity<>(this.detailOffreRepository.findByOffre(offre),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createDetailsOffre(String details) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        DetailsOffreDTO detailsOffreDTO = new ObjectMapper().readValue(details, DetailsOffreDTO.class);
        DetailsOffre detailsOffreFromFrontEnd = new DetailsOffre();
        Offre offre = this.offreRepository.findById(detailsOffreDTO.getOffre()).orElse(null);
        DetailsOffre detailsOffreToBD = new DetailsOffre();

        detailsOffreToBD.setOffre(offre);
        detailsOffreToBD.setIntitule(detailsOffreDTO.getIntitule());

        this.detailOffreRepository.save(detailsOffreToBD);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("creation detail offre : true");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> updateDetailsOffre(String details) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        DetailsOffreDTO detailsOffreDTO = new ObjectMapper().readValue(details, DetailsOffreDTO.class);
        DetailsOffre detailsOffreFromFrontEnd = new DetailsOffre();
        DetailsOffre detailsOffreToBD = this.detailOffreRepository.findById(detailsOffreDTO.getIdDetailOffre()).orElse(null);

        if (Objects.nonNull(detailsOffreDTO)){

            Offre offre = this.offreRepository.findById(detailsOffreDTO.getOffre()).orElse(null);
            DetailsOffre detailsOffreToSave = new DetailsOffre();

            detailsOffreToSave.setIdDetailOffre(detailsOffreToBD.getIdDetailOffre());
            detailsOffreToSave.setOffre(offre);
            detailsOffreToSave.setIntitule(detailsOffreDTO.getIntitule());

            this.detailOffreRepository.save(detailsOffreToSave);
            serverResponse.setSuccess(true);
            serverResponse.setMessage("update detail offre : true");

        }else{
            serverResponse.setSuccess(true);
            serverResponse.setMessage("update detail offre : failed");
        }

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteDetailsOffre(Integer idOffre) {
        ServerResponse serverResponse = new ServerResponse();
        this.detailOffreRepository.deleteById(idOffre);
        serverResponse.setSuccess(true);
        return new ResponseEntity<>(serverResponse, HttpStatus.OK);
    }

   public Abonnement findAbonnementEnCours(Integer idClient){
        Abonnement abonnementEnCours = new Abonnement();
        Client client = this.clientRepository.findById(idClient).orElse(null);
        List<Abonnement> abonnements = this.abonnementRepository.findByClient(client);

        List<LocalDate> dateFin = new ArrayList<>();
        for (int i = 0; i < abonnements.size() ; i++) {
            dateFin.add(abonnements.get(i).getDateFin());
        }

        Integer indexAbonnementValide =0;
        Integer d = 0;
        LocalDate dateActual = LocalDate.now();
        for (int i = 0; i < dateFin.size(); i++) {
            d = (int) ChronoUnit.DAYS.between(dateActual, dateFin.get(i));

            if (d>0 && d<=30){
                abonnementEnCours = abonnements.get(i);
            }
        }
        System.out.println("Abonnement  En cours : "+abonnementEnCours);

        return  abonnementEnCours;

    }
}
