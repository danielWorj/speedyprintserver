package com.example.speedyprintserver.CONTROLLER.Parametrage;

import com.example.speedyprintserver.DTO.Service.*;
import com.example.speedyprintserver.ENTITY.Service.Couleur;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.Service.*;
import com.example.speedyprintserver.REPOSITORY.Service.*;
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
import java.util.List;

@Controller
public class ControllerParametrageImpl implements ControllerParametrageInt{
    @Autowired
    private ModeImpressionRepository modeImpressionRepository;
    @Autowired
    private DimensionRepository dimensionRepository;
    @Autowired
    private FormatRepository formatRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ConceptionRepository conceptionRepository ;
    @Autowired
    private ImpressionRepository impressionRepository;
    @Autowired
    private TypeConceptionRepository typeConceptionRepository;
    @Autowired
    private TypePapierRepository typePapierRepository;
    @Autowired
    private FacesRepository facesRepository;
    @Autowired
    private GrammageRepository grammageRepository;
    @Autowired
    private FinitionRepository finitionRepository;
    @Autowired
    private FormeRepository formeRepository;
    @Autowired
    private CategorieServiceRepository categorieServiceRepository;
    @Autowired
    private CouleurRepository couleurRepository;
    @Autowired
    private FacturationFinitionRepository facturationFinitionRepository;
    @Autowired
    private FacturationCouleurRepository facturationCouleurRepository;

    private static String folderImage = System.getProperty("user.dir")+"/src/main/resources/templates/enterpriseApp/src/assets/image"; //chemin a déinir

    @Override
    public ResponseEntity<List<Service>> findAllService() {
        return new ResponseEntity<>(this.serviceRepository.findAll(Sort.by(Sort.Direction.DESC, "idServices")),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Service>> findAllByCategorieService(Integer idCategorie) {
        CategorieService categorieService = this.categorieServiceRepository.findById(idCategorie).orElse(null);
        return new ResponseEntity<>(this.serviceRepository.findByCategorieService(categorieService),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<Service> getServiceById(Integer idService) {
        return new ResponseEntity<>(this.serviceRepository.findById(idService).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createService(String service, MultipartFile file) throws IOException {
        ServerResponse serverResponse = new ServerResponse() ;
        ServiceDTO serviceDTO = new ObjectMapper().readValue(service, ServiceDTO.class);

        CategorieService categorieService = this.categorieServiceRepository.findById(serviceDTO.getCategorieService()).orElse(null);


        String fileName = "UNKNOW IMAGE";
        if (!file.isEmpty()){
            //image bien presente dans la requête
             fileName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileName);
            file.transferTo(path);

            System.out.println("Image copié");
        }

        Service service1 = new Service();

        service1.setIntitule(serviceDTO.getIntitule());
        service1.setDescription(serviceDTO.getDescription());
        service1.setCategorieService(categorieService);
        service1.setImage(fileName);
        service1.setDate(LocalDate.now());


        this.serviceRepository.save(service1);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Service crée");

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deletService(Integer idService) {
        ServerResponse serverResponse = new ServerResponse();
        this.serviceRepository.deleteById(idService);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("Service Supprimé");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CategorieService>> findAllCategorieService() {
        return new ResponseEntity<>(this.categorieServiceRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createCategorieService(String categorieservice , MultipartFile file) throws IOException {
        ServerResponse serverResponse = new ServerResponse();

        CategorieService categorieServiceFromFrontEnd = new ObjectMapper().readValue(categorieservice, CategorieService.class);

        CategorieService categorieServiceDB = new CategorieService();


        String fileName = "UNKNOW IMAGE";
        if (!file.isEmpty()){
            //image bien presente dans la requête
            fileName = file.getOriginalFilename();
            Path path = Paths.get(folderImage,fileName);
            file.transferTo(path);

            System.out.println("Image copié");
        }

        categorieServiceDB.setImage(fileName);
        categorieServiceDB.setIntitule(categorieServiceFromFrontEnd.getIntitule());


        this.categorieServiceRepository.save(categorieServiceDB);

        serverResponse.setSuccess(true);

        serverResponse.setMessage("Catgorie de service crée");
        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteCategorieService(Integer idCategorie) {
        ServerResponse serverResponse = new ServerResponse();
        this.categorieServiceRepository.deleteById(idCategorie);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("Categorie Service delete");

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ModeImpression>> findAllModeImpression() {
        return new ResponseEntity<>(this.modeImpressionRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ModeImpression> findModeById(Integer idMi) {
        return new ResponseEntity<>(this.modeImpressionRepository.findById(idMi).orElse(null),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<List<ModeImpression>> findAllModeImpressionByService(Integer idService) {
        Service service1 = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.modeImpressionRepository.findByService(service1),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createModeImpression(String mi) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        ModeImpressionDTO modeImpressionDTO = new ObjectMapper().readValue(mi, ModeImpressionDTO.class);

        ModeImpression modeImpression = new ModeImpression();
        Service service = this.serviceRepository.findById(modeImpressionDTO.getService()).orElse(null);

        modeImpression.setIntitule(modeImpressionDTO.getIntitule());
        modeImpression.setDescription(modeImpressionDTO.getDescription());
        modeImpression.setService(service);
        modeImpression.setValeurAjout(modeImpressionDTO.getValeurAjout());
        modeImpression.setValeurMultiplication(modeImpressionDTO.getValeurMultiplication());

        this.modeImpressionRepository.save(modeImpression);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Mode Impression : crée");
        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteModeImpression(Integer idMi) {
        ServerResponse serverResponse = new ServerResponse();
        this.modeImpressionRepository.deleteById(idMi);
        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Format>> findAllFormat() {
        return new ResponseEntity<>(this.formatRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Format> findFormatById(Integer idFormat) {
        return new ResponseEntity<>(this.formatRepository.findById(idFormat).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Format>> findAllFormatByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);

        return new ResponseEntity<>(this.formatRepository.findByService(service),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createFormat(String format) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FormatDTO formatDTO = new ObjectMapper().readValue(format, FormatDTO.class);
        Format format1 = new Format();
        Service service = this.serviceRepository.findById(formatDTO.getService()).orElse(null);

        format1.setIntitule(formatDTO.getIntitule());
        format1.setService(service);
        format1.setValeurAjout(formatDTO.getValeurAjout());
        format1.setValeurMultiplication(formatDTO.getValeurMultiplication());

        this.formatRepository.save(format1);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Format crée");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteFormat(Integer idFormat) {
        ServerResponse serverResponse = new ServerResponse() ;
        this.formatRepository.deleteById(idFormat);
        serverResponse.setSuccess(true);
        serverResponse.setMessage("Format delete");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Dimension>> findAllDimension() {
        return new ResponseEntity<>(this.dimensionRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Dimension> findDimensionById(Integer id) {
        return new ResponseEntity<>(this.dimensionRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Dimension>> findAllDimensionByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.dimensionRepository.findByService(service),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createDimension(String dim) throws JsonProcessingException {
        ServerResponse serverResponse =  new ServerResponse();

        DimensionDTO dimensionDTO = new ObjectMapper().readValue(dim, DimensionDTO.class);
        Service service = this.serviceRepository.findById(dimensionDTO.getService()).orElse(null);

        Dimension dimension = new Dimension();

        dimension.setIntitule(dimensionDTO.getIntitule());
        dimension.setTaille(dimensionDTO.getTaille());
        dimension.setValeurAjout(dimensionDTO.getValeurAjout());
        dimension.setValeurMultiplication(dimensionDTO.getValeurMultiplication());
        dimension.setService(service);

        this.dimensionRepository.save(dimension);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Dimension crée");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteDimension(Integer idDim) {
        ServerResponse serverResponse = new ServerResponse();
        this.dimensionRepository.deleteById(idDim);
        serverResponse.setMessage("Dimension supprimée");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Conception>> findAllConception() {
        return new ResponseEntity<>(this.conceptionRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Conception> findConceptionById(Integer idConception) {
        return new ResponseEntity<>(this.conceptionRepository.findById(idConception).orElse(null), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Conception>> findAllConceptionByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.conceptionRepository.findByService(service), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createConception(String conception) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();
        ConceptionDTO conceptionDTO = new  ObjectMapper().readValue(conception, ConceptionDTO.class);

        Conception conceptionToSave = new Conception();
        Service service = this.serviceRepository.findById(conceptionDTO.getService()).orElse(null);
        TypeConception typeConception = this.typeConceptionRepository.findById(conceptionDTO.getTypeConception()).orElse(null);

        conceptionToSave.setTypeConception(typeConception);
        conceptionToSave.setMontant(conceptionDTO.getMontant());
        conceptionToSave.setService(service);

        this.conceptionRepository.save(conceptionToSave);


        serverResponse.setSuccess(true);
        serverResponse.setMessage("Prix de conception crée");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteConception(Integer idConception) {
        ServerResponse serverResponse = new ServerResponse();

        this.conceptionRepository.deleteById(idConception);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Impression>> findAllImpression() {
        return new ResponseEntity<>(this.impressionRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Impression> findImpressionById(Integer idImpression) {
        return new ResponseEntity<>(this.impressionRepository.findById(idImpression).orElse(null), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Impression>> findImpressionByServic(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);

        return new ResponseEntity<>(this.impressionRepository.findByService(service),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> creaImpression(String impression) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        ImpressionDTO impressionDTO = new ObjectMapper().readValue(impression, ImpressionDTO.class);

        Impression impressionToSave = new Impression();
        Service service = this.serviceRepository.findById(impressionDTO.getService()).orElse(null);

        ModeImpression modeImpression = new ModeImpression();
        if (impressionDTO.getModeImpression()!=null){
            modeImpression  = this.modeImpressionRepository.findById(impressionDTO.getModeImpression()).orElse(null);
        }else{
            modeImpression = null;
        }

        Dimension dimension = new Dimension();
        if (impressionDTO.getDimension()!=null){
            dimension  = this.dimensionRepository.findById(impressionDTO.getDimension()).orElse(null);
        }else{
            dimension = null;
        }

        Format format = new Format();

        if (impressionDTO.getFormat()!=null){
            format = this.formatRepository.findById(impressionDTO.getFormat()).orElse(null);
        }else{
            format = null;
        }



        TypePapier typePapier = new TypePapier();

        if (impressionDTO.getTypePapier()!=null){
            typePapier = this.typePapierRepository.findById(impressionDTO.getTypePapier()).orElse(null);
        }else{
            typePapier = null;
        }

        Faces faces = new Faces();

        if (impressionDTO.getFace()!=null){
            faces = this.facesRepository.findById(impressionDTO.getFace()).orElse(null);
        }else{
            faces = null;
        }

        Grammage grammage = new Grammage();

        if (impressionDTO.getGrammage()!=null){
            grammage = this.grammageRepository.findById(impressionDTO.getGrammage()).orElse(null);
        }else{
            grammage = null;
        }

        Finition finition = new Finition();

        if (impressionDTO.getFinition()!=null){
            finition = this.finitionRepository.findById(impressionDTO.getFinition()).orElse(null);
        }else{
            finition = null;
        }


        Forme forme = new Forme();

        if (impressionDTO.getForme()!=null){
            forme = this.formeRepository.findById(impressionDTO.getForme()).orElse(null);
        }else{
            forme = null;
        }

        Couleur couleur = new Couleur();

        if (impressionDTO.getCouleur()!=null){
            couleur = this.couleurRepository.findById(impressionDTO.getCouleur()).orElse(null);
        }else{
            couleur = null;
        }



        impressionToSave.setModeImpression(modeImpression);
        impressionToSave.setDimension(dimension);
        impressionToSave.setFormat(format);
        impressionToSave.setTypePapier(typePapier);
        impressionToSave.setFaces(faces);
        impressionToSave.setGrammage(grammage);
        impressionToSave.setFinition(finition);
        impressionToSave.setCouleur(couleur);
        impressionToSave.setForme(forme);
        impressionToSave.setMontant(impressionDTO.getMontant());
        impressionToSave.setBorneInferieure(impressionDTO.getBorneInferieure());
        impressionToSave.setBorneSuperieure(impressionDTO.getBorneSuperieure());
        impressionToSave.setRemise(impressionDTO.getRemise());
        impressionToSave.setService(service);

        this.impressionRepository.save(impressionToSave);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Impression crée");

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteImpression(Integer idImpression) {
        ServerResponse serverResponse = new ServerResponse();

        this.impressionRepository.deleteById(idImpression);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TypeConception>> findAllTypeConception() {
        return new ResponseEntity<>(this.typeConceptionRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createTypeConception(String typeconception) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        TypeConception typeConception = new ObjectMapper().readValue(typeconception, TypeConception.class);

        this.typeConceptionRepository.save(typeConception);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteTypeConception(Integer idTypeConception) {

        ServerResponse serverResponse = new ServerResponse();

        this.typeConceptionRepository.deleteById(idTypeConception);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TypePapier>> findAllTypePapier() {
        return new ResponseEntity<>(this.typePapierRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<TypePapier> findTypePapierById(Integer id) {
        return new ResponseEntity<>(this.typePapierRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TypePapier>> findAllTypePapierByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.typePapierRepository.findByService(service),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<ServerResponse> createTypePapier(String typepapier) throws JsonProcessingException {

        ServerResponse serverResponse = new ServerResponse();

        TypePapierDTO typePapierDTO = new ObjectMapper().readValue(typepapier, TypePapierDTO.class);
        Service service = this.serviceRepository.findById(typePapierDTO.getService()).orElse(null);

        TypePapier typePapierDB = new TypePapier();
        typePapierDB.setIntitule(typePapierDTO.getIntitule());
        typePapierDB.setValeurAjout(typePapierDTO.getValeurAjout());
        typePapierDB.setValeurMultiplication(typePapierDTO.getValeurMultiplication());
        typePapierDB.setService(service);

        this.typePapierRepository.save(typePapierDB);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteTypePapier(Integer idTypePapier) {
        ServerResponse serverResponse = new ServerResponse();

        this.typeConceptionRepository.deleteById(idTypePapier);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Faces>> findAllFaceByService(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<List<Faces>> findAllFace() {
        return new ResponseEntity<>(this.facesRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Faces> findFaceById(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<ServerResponse> createFace(String face) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FaceDTO faceDTO = new  ObjectMapper().readValue(face, FaceDTO.class);

        Service service = this.serviceRepository.findById(faceDTO.getService()).orElse(null);

        Faces faces1 = new Faces();
        faces1.setIntitule(faceDTO.getIntitule());
        faces1.setValeurAjout(faceDTO.getValeurAjout());
        faces1.setValeurMultiplication(faceDTO.getValeurMultiplication());
        faces1.setService(service);

        this.facesRepository.save(faces1);

        serverResponse.setMessage("Face crée");
        serverResponse.setSuccess(true);
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Grammage>> findAllGrammage() {
        return new ResponseEntity<>(this.grammageRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Grammage> findGrammageById(Integer id) {
        return new ResponseEntity<>(this.grammageRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Grammage>> findAllGrammageByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.grammageRepository.findByService(service),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<ServerResponse> createGrammage(String grammage) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        GrammageDTO grammageDTO = new ObjectMapper().readValue(grammage, GrammageDTO.class);
        Service service = this.serviceRepository.findById(grammageDTO.getService()).orElse(null);

        Grammage grammageDB = new Grammage();
        grammageDB.setIntitule(grammageDTO.getIntitule());
        grammageDB.setService(service);
        grammageDB.setValeurAjout(grammageDTO.getValeurAjout());
        grammageDB.setValeurMultiplication(grammageDTO.getValeurMultiplication());
        this.grammageRepository.save(grammageDB);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteGrammage(Integer idGrammage) {
        ServerResponse serverResponse = new ServerResponse();

        this.grammageRepository.deleteById(idGrammage);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Finition>> findAllFinition() {
        return new ResponseEntity<>(this.finitionRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Finition> findFinitionById(Integer id) {
        return new ResponseEntity<>(this.finitionRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Finition>> findAllFinitionByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.finitionRepository.findByService(service),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<ServerResponse> createFinition(String finition) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FinitionDTO finitionDTO = new ObjectMapper().readValue(finition, FinitionDTO.class);
        Service service = this.serviceRepository.findById(finitionDTO.getService()).orElse(null);

        Finition finitionDB = new Finition();
        finitionDB.setIntitule(finitionDTO.getIntitule());
        finitionDB.setService(service);

        this.finitionRepository.save(finitionDB);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteFinition(Integer idFinition) {
        ServerResponse serverResponse = new ServerResponse();

        this.finitionRepository.deleteById(idFinition);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Forme>> findAllForme() {
        return new ResponseEntity<>(this.formeRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Forme> findFormeById(Integer id) {
        return new ResponseEntity<>(this.formeRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Forme>> findAllFormeByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.formeRepository.findByService(service),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<ServerResponse> createForme(String forme) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FormeDTO formeDTO = new ObjectMapper().readValue(forme, FormeDTO.class);
        Service service = this.serviceRepository.findById(formeDTO.getService()).orElse(null);

        Forme formeDB = new Forme();
        formeDB.setIntitule(formeDTO.getIntitule());
        formeDB.setService(service);
        formeDB.setValeurAjout(formeDTO.getValeurAjout());
        formeDB.setValeurMultiplication(formeDTO.getValeurMultiplication());

        this.formeRepository.save(formeDB);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteForme(Integer idForme) {
        ServerResponse serverResponse = new ServerResponse();

        this.formeRepository.deleteById(idForme);

        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Couleur>> findAllCouleurByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.couleurRepository.findByService(service),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Couleur> findCouleurById(Integer id) {
        return new ResponseEntity<>(this.couleurRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createCouleur(String couleur) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        CouleurDTO couleurDTO = new ObjectMapper().readValue(couleur,CouleurDTO.class);
        Service service = this.serviceRepository.findById(couleurDTO.getService()).orElse(null);

        Couleur couleurDB = new Couleur();
        couleurDB.setIntitule(couleurDTO.getIntitule());
        couleurDB.setService(service);

        this.couleurRepository.save(couleurDB);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Couleur crée");
        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteCouleur(Integer idCouleur) {
        ServerResponse serverResponse = new ServerResponse();
        this.couleurRepository.deleteById(idCouleur);
        serverResponse.setMessage("Suppression de la couleur");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Faces>> findAllFacesByService(Integer idService) {
        Service service = this.serviceRepository.findById(idService).orElse(null);
        return new ResponseEntity<>(this.facesRepository.findByService(service),HttpStatus.OK );
    }

    @Override
    public ResponseEntity<Faces> findFacesById(Integer id) {
        return new ResponseEntity<>(this.facesRepository.findById(id).orElse(null),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createFaces(String faces) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FaceDTO faceDTO = new ObjectMapper().readValue(faces, FaceDTO.class);
        Service service = this.serviceRepository.findById(faceDTO.getService()).orElse(null);

        Faces facesDB = new Faces();
        facesDB.setService(service);
        facesDB.setIntitule(faceDTO.getIntitule());
        facesDB.setValeurAjout(faceDTO.getValeurAjout());
        facesDB.setValeurMultiplication(faceDTO.getValeurMultiplication());

        this.facesRepository.save(facesDB);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("La face a bien été crée");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteFaces(Integer idFaces) {
        ServerResponse serverResponse = new ServerResponse();
        serverResponse.setSuccess(true);
        this.facesRepository.deleteById(idFaces);
        serverResponse.setMessage("Suppression face");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<FacturationFinition>> findAllFacturationFinitionById(Integer id) {
        Finition finition = this.finitionRepository.findById(id).orElse(null);
        return new ResponseEntity<>(this.facturationFinitionRepository.findByFinition(finition),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createFacturationFinition(String facturationFinition) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();

        FacturationFinitionDTO facturationFinitionDTO = new  ObjectMapper().readValue(facturationFinition,FacturationFinitionDTO.class);

        FacturationFinition facturationFinitionDB = new FacturationFinition();
        Finition finition = this.finitionRepository.findById(facturationFinitionDTO.getFinition()).orElse(null);

        facturationFinitionDB.setFinition(finition);
        facturationFinitionDB.setBorneInferieure(facturationFinitionDTO.getBorneInferieure());
        facturationFinitionDB.setBorneSuperieure(facturationFinitionDTO.getBorneSuperieure());
        facturationFinitionDB.setValeurAjout(facturationFinitionDTO.getValeurAjout());
        facturationFinitionDB.setValeurMultiplication(facturationFinitionDTO.getValeurMultiplication());

        this.facturationFinitionRepository.save(facturationFinitionDB);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Facturation Finition crée");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteFacturationFinition(Integer id) {
        ServerResponse serverResponse = new ServerResponse();
        this.facturationFinitionRepository.deleteById(id);
        serverResponse.setSuccess(true);
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<FacturationCouleur>> findAllFacturationCouleurById(Integer id) {
        Couleur couleur = this.couleurRepository.findById(id).orElse(null);

        return new ResponseEntity<>(this.facturationCouleurRepository.findByCouleur(couleur),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createFacturationCouleur(String facturationCouleur) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse();
        FacturationCouleurDTO facturationCouleurDTO = new  ObjectMapper().readValue(facturationCouleur, FacturationCouleurDTO.class);

        FacturationCouleur facturationCouleurDB = new FacturationCouleur();
        Couleur couleur = this.couleurRepository.findById(facturationCouleurDTO.getCouleur()).orElse(null);

        facturationCouleurDB.setCouleur(couleur);
        facturationCouleurDB.setValeurAjout(facturationCouleurDTO.getValeurAjout());
        facturationCouleurDB.setValeurMultiplication(facturationCouleurDTO.getValeurMultiplication());
        facturationCouleurDB.setBorneInferieure(facturationCouleurDTO.getBorneInferieure());
        facturationCouleurDB.setBorneSuperieure(facturationCouleurDTO.getBorneSuperieure());

        System.out.println(facturationCouleurDB.toString());

        this.facturationCouleurRepository.save(facturationCouleurDB);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Facturation couleur");
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteFacturationCouleur(Integer id) {
        ServerResponse serverResponse = new ServerResponse();
        serverResponse.setSuccess(true);
        this.facturationCouleurRepository.deleteById(id);
        serverResponse.setSuccess(true);
        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }
}
