package com.example.speedyprintserver.CONTROLLER.Commande;

import com.example.speedyprintserver.DTO.Commande.CommandeDTO;
import com.example.speedyprintserver.DTO.Commande.ConceptionCommandeDTO;
import com.example.speedyprintserver.DTO.Commande.ImageCommandeDTO;
import com.example.speedyprintserver.DTO.Commande.LivraisonDTO;
import com.example.speedyprintserver.ENTITY.Commande.*;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.Service.*;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.example.speedyprintserver.REPOSITORY.Commande.*;
import com.example.speedyprintserver.REPOSITORY.Service.*;
import com.example.speedyprintserver.REPOSITORY.User.ClientRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Controller
public class ControllerCommandeImplement implements ControllerCommandeInterface {
    @Autowired
    private CommandeRepository commandeRepository ;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ModeImpressionRepository modeImpressionRepository;
    @Autowired
    private FormatRepository formatRepository;
    @Autowired
    private DimensionRepository dimensionRepository;
    @Autowired
    private LivraisonRepository livraisonRepository ;
    @Autowired
    private ConceptionRepository conceptionRepository;
    @Autowired
    private ImpressionRepository impressionRepository;
    @Autowired
    private EtatCommandeRepository etatCommandeRepository;
    @Autowired
    private ImageCommandeRepository imageCommandeRepository ;
    @Autowired
    private ConceptionCommandeRepository conceptionCommandeRepository;
    @Autowired
    private FacesRepository facesRepository ;//Dans le package commande
    @Autowired
    private TypePapierRepository typePapierRepository;
    @Autowired
    private GrammageRepository grammageRepository;
    @Autowired
    private FinitionRepository finitionRepository;
    @Autowired
    private CouleurRepository couleurRepository;
    @Autowired
    private FormeRepository formeRepository;
    final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static String folderImage = System.getProperty("user.dir")+"/src/main/resources/templates/enterpriseApp/src/assets/image"; //chemin a déinir

    @Override
    public ResponseEntity<CommandeDTO> fetcgDto() {
        Commande commande = this.commandeRepository.findById(9).orElse(null);

        CommandeDTO commandeDTO = new CommandeDTO();
        commandeDTO.setIdCommande(commande.getIdCommande());
        commandeDTO.setEtatCommande(commande.getEtatCommande().getIdEtatCommande());
        commandeDTO.setService(commande.getService().getIdServices());
        commandeDTO.setModeImpression(commande.getModeImpression().getIdModeImpression());
        commandeDTO.setFormat(commande.getFormat().getIdFormat());
        commandeDTO.setOrigin(commande.getOrigin());
        commandeDTO.setQuantite(commande.getQuantite());
        commandeDTO.setDimension(commande.getDimension().getIdDimension());

        return new ResponseEntity<>(commandeDTO,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Commande>> findAllCommande() {
        return new ResponseEntity<>(this.commandeRepository.findAll(Sort.by(Sort.Direction.DESC,"idCommande")), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Commande> findByIdCommande(Integer idCommande) {
        return new ResponseEntity<>(this.commandeRepository.findById(idCommande).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Commande>> findAllCommandeByClient(Integer idClient) {
        Client client = this.clientRepository.findById(idClient).orElse(null);
        return new ResponseEntity<>(this.commandeRepository.findByClientOrderByIdCommandeDesc(client),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> changeEtatCommande(Integer idCommande, Integer idEtat) {
        ServerResponse serverResponse = new ServerResponse();
        Commande commande = this.commandeRepository.findById(idCommande).orElse(null);
        EtatCommande etatCommande = this.etatCommandeRepository.findById(idEtat).orElse(null);

        if (Objects.nonNull(commande)){
            commande.setEtatCommande(etatCommande);
            this.commandeRepository.save(commande);

            serverResponse.setSuccess(true);
            serverResponse.setMessage("Etat de la commande modifié");
        }
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }



    @Override
    public ResponseEntity<ServerResponse> createCommande(String commande, MultipartFile file ,MultipartFile fileVerso) throws IOException {
        ServerResponse serverResponse = new ServerResponse();

        CommandeDTO commandeDTO = new ObjectMapper().readValue(commande, CommandeDTO.class);

        Commande commadeToSave = new Commande();

        Client client = this.clientRepository.findById(commandeDTO.getClient()).orElse(null);
        Service service = this.serviceRepository.findById(commandeDTO.getService()).orElse(null);
        ModeImpression modeImpression = this.modeImpressionRepository.findById(commandeDTO.getModeImpression()).orElse(null);

        Dimension dimension = new Dimension();
        if (commandeDTO.getDimension()!=null){
            dimension  = this.dimensionRepository.findById(commandeDTO.getDimension()).orElse(null);
        }else{
            dimension = null;
        }

        Format format = new Format();

        if (commandeDTO.getFormat()!=null){
            format = this.formatRepository.findById(commandeDTO.getFormat()).orElse(null);
        }else{
            format = null;
        }

        Conception conception = new Conception();

        if (commandeDTO.getConception()!=null){
            conception = this.conceptionRepository.findById(commandeDTO.getConception()).orElse(null);
        }else{
            conception = null;
        }

        Impression impression = new Impression();

        if (commandeDTO.getImpression()!=null){
            impression = this.impressionRepository.findById(commandeDTO.getImpression()).orElse(null);
        }else{
            impression = null;
        }

        TypePapier typePapier = new TypePapier();

        if (commandeDTO.getTypePapier()!=null){
            typePapier = this.typePapierRepository.findById(commandeDTO.getTypePapier()).orElse(null);
        }else{
            typePapier = null;
        }

        Faces face = new Faces();

        if (commandeDTO.getFace()!=null){
            face = this.facesRepository.findById(commandeDTO.getFace()).orElse(null);
        }else{
            face = null;
        }

        Grammage grammage = new Grammage();

        if (commandeDTO.getGrammage()!=null){
            grammage = this.grammageRepository.findById(commandeDTO.getGrammage()).orElse(null);
        }else{
            grammage = null;
        }

        Finition finition = new Finition();

        if (commandeDTO.getFinition()!=null){
            finition = this.finitionRepository.findById(commandeDTO.getFinition()).orElse(null);
        }else{
            finition = null;
        }

        Couleur couleur = new Couleur();

        if (commandeDTO.getCouleur()!=null){
            couleur = this.couleurRepository.findById(commandeDTO.getCouleur()).orElse(null);
        }else{
            couleur = null;
        }

        Forme forme = new Forme();

        if (commandeDTO.getForme()!=null){
            forme = this.formeRepository.findById(commandeDTO.getForme()).orElse(null);
        }else{
            forme = null;
        }


        if (commandeDTO.getCouleur()!=null){
            couleur = this.couleurRepository.findById(commandeDTO.getCouleur()).orElse(null);
        }else{
            couleur = null;
        }


        Faces recto = this.facesRepository.findById(1).orElse(null); //Recto
        Faces rectoVerso = this.facesRepository.findById(2).orElse(null);
        LocalDate dateActuelle = LocalDate.now();

        commadeToSave.setClient(client);
        commadeToSave.setService(service);
        commadeToSave.setDateCreation(dateActuelle);
        commadeToSave.setQuantite(commandeDTO.getQuantite());
        commadeToSave.setOrigin(false);
        commadeToSave.setDateLivraison(LocalDate.parse(commandeDTO.getDateLivraison()));
        commadeToSave.setEtatCommande(null); //Au départ l'état commande sera en null et on affichera le message en ANALYSE
        commadeToSave.setModeImpression(modeImpression);
        commadeToSave.setDimension(dimension);
        commadeToSave.setFormat(format);
        commadeToSave.setConception(conception);
        commadeToSave.setImpression(impression);
        commadeToSave.setTypePapier(typePapier);
        commadeToSave.setFaces(face);
        commadeToSave.setGrammage(grammage);
        commadeToSave.setFinition(finition);
        commadeToSave.setCouleur(couleur);
        commadeToSave.setForme(forme);

        this.commandeRepository.save(commadeToSave);

        Commande commandeSaved = this.commandeRepository.findLastCreated();


        String fileName="";
        if (!file.isEmpty()){
            //image bien presente dans la requête
            fileName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileName);
            file.transferTo(path);

            System.out.println("Image copié");


            ImageCommande imageCommande = new ImageCommande();
            imageCommande.setUrl(fileName);
            imageCommande.setFaces(recto);
            imageCommande.setCommande(commandeSaved);

            this.imageCommandeRepository.save(imageCommande);


            serverResponse.setSuccess(true);
            serverResponse.setMessage("Commande Effectuée");

        }else{
            System.out.println("UNKNOW IMAGE");
        }


        String fileVersoName="";
        if (!file.isEmpty()){
            //image bien presente dans la requête
            fileVersoName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileVersoName);
            file.transferTo(path);

            System.out.println("Image Verso copié");


            ImageCommande imageCommande = new ImageCommande();
            imageCommande.setUrl(fileVersoName);
            imageCommande.setFaces(rectoVerso);

            imageCommande.setCommande(commandeSaved);

            this.imageCommandeRepository.save(imageCommande);


            serverResponse.setSuccess(true);
            serverResponse.setMessage("Commande Effectuée");

        }else{
            System.out.println("UNKNOW IMAGE");
        }

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Commande Effectuée");
        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteCommande(Integer idCommande) {

        ServerResponse serverResponse = new ServerResponse();
        Commande commande = this.commandeRepository.findById(idCommande).orElse(null);

        //On commence par supprimé les images d'une commande
        List<ImageCommande> imageCommandes = this.imageCommandeRepository.findByCommande(commande);

        for (int i = 0; i <imageCommandes.size() ; i++) {

            this.imageCommandeRepository.deleteById(imageCommandes.get(i).getIdImage());

        }
        //Ensuite on supprime la commande

        this.commandeRepository.deleteById(idCommande);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("Commande supprimée");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<EtatCommande>> findALLEtatCommande() {
        return new ResponseEntity<>(this.etatCommandeRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Commande> createCommandeFromMobile(CommandeDTO commandeDTO) {

        ServerResponse serverResponse = new ServerResponse();

        Commande commadeToSave = new Commande();

        Client client = this.clientRepository.findById(commandeDTO.getClient()).orElse(null);
        Service service = this.serviceRepository.findById(commandeDTO.getService()).orElse(null);
        ModeImpression modeImpression = this.modeImpressionRepository.findById(commandeDTO.getModeImpression()).orElse(null);
        Dimension dimension  = this.dimensionRepository.findById(commandeDTO.getDimension()).orElse(null);
        Format format = this.formatRepository.findById(commandeDTO.getFormat()).orElse(null);
        Conception conception = this.conceptionRepository.findById(commandeDTO.getConception()).orElse(null);
        Impression impression = this.impressionRepository.findById(commandeDTO.getImpression()).orElse(null);

        LocalDate dateActuelle = LocalDate.now();

        commadeToSave.setClient(client);
        commadeToSave.setService(service);
        commadeToSave.setDateCreation(dateActuelle);
        commadeToSave.setDescription(commadeToSave.getDescription());
        commadeToSave.setQuantite(commandeDTO.getQuantite());
        commadeToSave.setOrigin(true);//vient de l'application mobile
        commadeToSave.setDateLivraison(LocalDate.parse(commandeDTO.getDateLivraison()));
        commadeToSave.setEtatCommande(null);//Au départ l'état commande sera en null et on affichera le message en ANALYSE
        commadeToSave.setModeImpression(modeImpression);
        commadeToSave.setDimension(dimension);
        commadeToSave.setFormat(format);
        commadeToSave.setConception(conception);
        commadeToSave.setImpression(impression);

        this.commandeRepository.save(commadeToSave);
        Commande commandeSave = this.commandeRepository.findLastCreated();

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Commande Effectuée");
        return new ResponseEntity<>(commandeSave,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> addImageByCommande(MultipartFile file) throws IOException {
        ServerResponse serverResponse = new ServerResponse();

        if (!file.isEmpty()){
            //image bien presente dans la requête
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileName);
            file.transferTo(path);

            serverResponse.setSuccess(true);
            serverResponse.setMessage("Commande Effectuée Avec succès");

            System.out.println("Image copié");
        }else{
            System.out.println("UNKNOW IMAGE");
            serverResponse.setSuccess(false);
        }

        return  new ResponseEntity<>(serverResponse,HttpStatus.OK);

    }


    @Override
    public ResponseEntity<Integer> countAllCommande() {
        Integer count = (int) this.commandeRepository.count();
        return new ResponseEntity<>(count ,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> countAllByOriginMob() {
        Long count =  this.commandeRepository.countByOrigin(true);
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> findAllServiceCommande() {
        return new ResponseEntity<>(this.commandeRepository.findNameCommandeGroupByService(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Integer>> findAllCountGroupByService() {
        return new ResponseEntity<>(this.commandeRepository.findCountCommandeGroupByService(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> findListServiceGroupByMonth() {
        return new ResponseEntity<>(this.commandeRepository.listIntituleServiceCommandeGroupByMonth(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Long>> findQteServiceGroupByMonth() {
        return new ResponseEntity<>(this.commandeRepository.listQteServiceCommandeGroupByMonth(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> countGroupByMonth() {
        return new ResponseEntity<>(this.commandeRepository.listByMonthName(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Long>> countCommandeGroupByMonth() {
        return new ResponseEntity<>(this.commandeRepository.listCountByMonth(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createImageCommande(ImageCommandeDTO imageCommandeDTO) {
        ServerResponse serverResponse = new ServerResponse();

        Commande commande = this.commandeRepository.findById(imageCommandeDTO.getCommande()).orElse(null);
        Faces face = this.facesRepository.findById(imageCommandeDTO.getFace()).orElse(null);
        ImageCommande imageCommande = new ImageCommande();

        imageCommande.setCommande(commande);
        imageCommande.setUrl(imageCommandeDTO.getUrl());

        this.imageCommandeRepository.save(imageCommande);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Image Commande create");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ImageCommande>> findAllImageByCommande(Integer idCommande) {
        Commande commande = this.commandeRepository.findById(idCommande).orElse(null);

        return new ResponseEntity<>(this.imageCommandeRepository.findByCommande(commande),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<List<Livraison>> findAllLivraison() {
        return new ResponseEntity<>(this.livraisonRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Livraison>> findAllLivraisonByClient(Integer idClient) {
        return new ResponseEntity<>(this.livraisonRepository.findLivraisonByClient(idClient),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> creatLivraison(String livraison) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        LivraisonDTO livraisonDTO = new  ObjectMapper().readValue(livraison, LivraisonDTO.class);

        Livraison livraisonToSave = new Livraison();
        Commande commande = this.commandeRepository.findById(livraisonDTO.getCommande()).orElse(null);

        LocalDate localDate = LocalDate.parse(livraisonDTO.getLocalDate(), formatter);


        livraisonToSave.setCommande(commande);
        livraisonToSave.setEtat(true);//livré = 1 | livré = 0
        livraisonToSave.setLocalDate(localDate);
        livraisonToSave.setDestination(livraisonDTO.getDestination());

        this.livraisonRepository.save(livraisonToSave);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Livraison created");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteLivraison(Integer idLivraison) {
        ServerResponse serverResponse = new ServerResponse();

        this.livraisonRepository.deleteById(idLivraison);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Livraison delete");

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> countLivraison() {
        Long count = this.livraisonRepository.count();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> allLivraisonService() {
        List<String> allService = this.livraisonRepository.listServiceLivraison();
        return new ResponseEntity<>(allService,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Long>> allQteLivraison() {
        List<Long> allQte = this.livraisonRepository.listQteServiceLivraison();
        return new ResponseEntity<>(allQte,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> findLivraisonByMonth() {
        return new ResponseEntity<>(this.livraisonRepository.listServiceByMonth(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Long>> findQteLivraisonByMonth() {
        return new ResponseEntity<>(this.livraisonRepository.listCountByMonth(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<String>> findGroupLivraisonByMonth() {
        return new ResponseEntity<>(this.livraisonRepository.listByMonthName(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ConceptionCommande>> findAllConceptionByCommande(Integer idCommande) {
        Commande commande = this.commandeRepository.findById(idCommande).orElse(null);
        return new ResponseEntity<>(this.conceptionCommandeRepository.findByCommande(commande),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ConceptionCommande>> findAllConceptionByClient(Integer idClient) {
        return new ResponseEntity<>(this.conceptionCommandeRepository.findAllConceptionCommandeByClient(idClient),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createConceptionCommande(String conceptionCommande, MultipartFile file) throws IOException {
        ServerResponse serverResponse = new ServerResponse();

        ConceptionCommandeDTO conceptionCommandeDTO = new  ObjectMapper().readValue(conceptionCommande,ConceptionCommandeDTO.class);
        Commande commande = this.commandeRepository.findById(conceptionCommandeDTO.getCommande()).orElse(null);


        ConceptionCommande conceptionCommandeDB = new ConceptionCommande();

        conceptionCommandeDB.setDate(LocalDate.now());
        conceptionCommandeDB.setCommande(commande);



        if (!file.isEmpty()){
            //image bien presente dans la requête
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileName);
            file.transferTo(path);


            conceptionCommandeDB.setUrl(fileName);

            System.out.println("Image copié");
        }else{
            System.out.println("UNKNOW IMAGE");
        }

        this.conceptionCommandeRepository.save(conceptionCommandeDB);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Une conception pour cette Commande a été ajoutée");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> avisConceptionCommande(ConceptionCommandeDTO conceptionCommandeDTO) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        Commande commande = this.commandeRepository.findById(conceptionCommandeDTO.getCommande()).orElse(null);
        ConceptionCommande conceptionCommandeCall  = this.conceptionCommandeRepository.findById(conceptionCommandeDTO.getIdConception()).orElse(null);

        if (Objects.nonNull(conceptionCommandeCall)){
            //
            conceptionCommandeCall.setMessage(conceptionCommandeDTO.getMessage());
            conceptionCommandeCall.setDateMisAJour(LocalDate.now());
            this.conceptionCommandeRepository.save(conceptionCommandeCall);
            serverResponse.setSuccess(true);
            serverResponse.setMessage("L'avis du client a bien été mis à jour");
        }else {
            serverResponse.setSuccess(false);
            serverResponse.setMessage("Erreur mise a jour avis");
        }

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> updateConceptionCommande(String conceptionCommande, MultipartFile file) {
        return null;
    }


    @Override
    public ResponseEntity<ServerResponse> deleteConceptionCommande(Integer idConception) {
        ServerResponse serverResponse = new ServerResponse();

        this.conceptionCommandeRepository.deleteById(idConception);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Conception de Commmande supprimé");

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }
}
