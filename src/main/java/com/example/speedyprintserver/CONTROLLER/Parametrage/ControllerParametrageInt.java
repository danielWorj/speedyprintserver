package com.example.speedyprintserver.CONTROLLER.Parametrage;


import com.example.speedyprintserver.ENTITY.Service.Couleur;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.Service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/speedyprint/parametrage/")
@CrossOrigin("*")
public interface ControllerParametrageInt {
    //Service
    @GetMapping("/service/all")
    ResponseEntity<List<Service>> findAllService();
    @GetMapping("/service/bycategorieservice/{idCategorie}")
    ResponseEntity<List<Service>> findAllByCategorieService(@PathVariable Integer idCategorie);
    @GetMapping("/service/byid/{idService}")
    ResponseEntity<Service> getServiceById(@PathVariable Integer idService);
    @PostMapping("/service/create")
    ResponseEntity<ServerResponse> createService(@RequestParam("service") String service , @RequestParam("file")MultipartFile file) throws IOException;
    @GetMapping("/service/delete/{idService}")
    ResponseEntity<ServerResponse> deletService(@PathVariable Integer idService);

    //Categorie Service
    @GetMapping("/categorieservice/all")
    ResponseEntity<List<CategorieService>> findAllCategorieService();
    @PostMapping("/categorieservice/create")
    ResponseEntity<ServerResponse> createCategorieService(@RequestParam("categorieservice") String categorieservice , @RequestParam("file")MultipartFile file) throws IOException;
    @GetMapping("/categorieservice/delete/{idCategorie}")
    ResponseEntity<ServerResponse> deleteCategorieService(@PathVariable Integer idCategorie);

    //ModeImpression
    @GetMapping("/mi/all")
    ResponseEntity<List<ModeImpression>> findAllModeImpression();
    @GetMapping("/mi/byId/{idMi}")
    ResponseEntity<ModeImpression> findModeById(@PathVariable Integer idMi);
    @GetMapping("/mi/byservice/{idService}")
    ResponseEntity<List<ModeImpression>> findAllModeImpressionByService(@PathVariable Integer idService);
    @PostMapping("/mi/create")
    ResponseEntity<ServerResponse> createModeImpression(@RequestParam("mi") String mi) throws JsonProcessingException;
    @GetMapping("/mi/delete/{idMi}")
    ResponseEntity<ServerResponse> deleteModeImpression(@PathVariable Integer idMi);

    //Format

    @GetMapping("/format/all")
    ResponseEntity<List<Format>> findAllFormat();
    @GetMapping("/format/byId/{idFormat}")
    ResponseEntity<Format> findFormatById(@PathVariable Integer idFormat);
    @GetMapping("/format/byservice/{idService}")
    ResponseEntity<List<Format>> findAllFormatByService(@PathVariable Integer idService);
    @PostMapping("/format/create")
    ResponseEntity<ServerResponse> createFormat(@RequestParam("format") String format) throws JsonProcessingException;
    @GetMapping("/format/delete/{idFormat}")
    ResponseEntity<ServerResponse> deleteFormat(@PathVariable Integer idFormat);

    //Dimension

    @GetMapping("/dim/all")
    ResponseEntity<List<Dimension>> findAllDimension();
    @GetMapping("/dim/byId/{id}")
    ResponseEntity<Dimension> findDimensionById(@PathVariable Integer id);
    @GetMapping("/dim/byservice/{idService}")
    ResponseEntity<List<Dimension>> findAllDimensionByService(@PathVariable Integer idService);
    @PostMapping("/dim/create")
    ResponseEntity<ServerResponse> createDimension(@RequestParam("dim") String dim) throws JsonProcessingException;
    @GetMapping("/dim/delete/{idDim}")
    ResponseEntity<ServerResponse> deleteDimension(@PathVariable Integer idDim);


    //CONCEPTION
    @GetMapping("/conception/all")
    ResponseEntity<List<Conception>> findAllConception();
    @GetMapping("/conception/byid/{idConception}")
    ResponseEntity<Conception> findConceptionById(@PathVariable Integer idConception);
    @GetMapping("/conception/all/byservice/{idService}")
    ResponseEntity<List<Conception>> findAllConceptionByService(@PathVariable Integer idService);
    @PostMapping("/conception/create")
    ResponseEntity<ServerResponse> createConception(@RequestParam("conception") String conception) throws JsonProcessingException;
    @GetMapping("/conception/delete/{idConception}")
    ResponseEntity<ServerResponse> deleteConception(@PathVariable Integer idConception);

    //IMPRESSION: QUANTITE PRIX
    @GetMapping("/impression/all")
    ResponseEntity<List<Impression>> findAllImpression();
    @GetMapping("/impression/findbyid/{idImpression}")
    ResponseEntity<Impression> findImpressionById(@PathVariable Integer idImpression);
    @GetMapping("/impression/byservice/{idService}")
    ResponseEntity<List<Impression>> findImpressionByServic(@PathVariable Integer idService);

    @PostMapping("/impression/create")
    ResponseEntity<ServerResponse> creaImpression(@RequestParam("impression") String impression) throws JsonProcessingException;
    @GetMapping("/impression/delete/{idImpression}")
    ResponseEntity<ServerResponse> deleteImpression(@PathVariable Integer idImpression);

    //TypeConception

    @GetMapping("/typeconception/all")
    ResponseEntity<List<TypeConception>> findAllTypeConception();
    @PostMapping("/typeconception/create")
    ResponseEntity<ServerResponse> createTypeConception(@RequestParam("typeconception") String typeconception) throws JsonProcessingException;
    @GetMapping("/typeconception/delete/{idTypeConception}")
    ResponseEntity<ServerResponse> deleteTypeConception(@PathVariable Integer idTypeConception);

    //Type Papier
    @GetMapping("/typepapier/all")
    ResponseEntity<List<TypePapier>> findAllTypePapier();
    @GetMapping("/typepapier/byId/{id}")
    ResponseEntity<TypePapier> findTypePapierById(@PathVariable Integer id);
    @GetMapping("/typepapier/byservice/{idService}")
    ResponseEntity<List<TypePapier>> findAllTypePapierByService(@PathVariable Integer idService);
    @PostMapping("/typepapier/create")
    ResponseEntity<ServerResponse> createTypePapier(@RequestParam("typepapier") String typepapier) throws JsonProcessingException;
    @GetMapping("/typepapier/delete/{idTypePapier}")
    ResponseEntity<ServerResponse> deleteTypePapier(@PathVariable Integer idTypePapier);
    //Face

    @GetMapping("/face/all/byservice/{id}")
    ResponseEntity<List<Faces>> findAllFaceByService(@PathVariable Integer id);
    @GetMapping("/face/all")
    ResponseEntity<List<Faces>> findAllFace();
    @GetMapping("/face/byId/{id}")
    ResponseEntity<Faces> findFaceById(@PathVariable Integer id);
    @PostMapping("/face/create")
    ResponseEntity<ServerResponse> createFace(@RequestParam("face") String face) throws JsonProcessingException;

    //Grammage
    @GetMapping("/grammage/all")
    ResponseEntity<List<Grammage>> findAllGrammage();
    @GetMapping("/grammage/byId/{id}")
    ResponseEntity<Grammage> findGrammageById(@PathVariable Integer id);
    @GetMapping("/grammage/byservice/{idService}")
    ResponseEntity<List<Grammage>> findAllGrammageByService(@PathVariable Integer idService);
    @PostMapping("/grammage/create")
    ResponseEntity<ServerResponse> createGrammage(@RequestParam("grammage") String grammage) throws JsonProcessingException;
    @GetMapping("/grammage/delete/{idGrammage}")
    ResponseEntity<ServerResponse> deleteGrammage(@PathVariable Integer idGrammage);
    //Finition

    @GetMapping("/finition/all")
    ResponseEntity<List<Finition>> findAllFinition();
    @GetMapping("/finition/byId/{id}")
    ResponseEntity<Finition> findFinitionById(@PathVariable Integer id);
    @GetMapping("/finition/byservice/{idService}")
    ResponseEntity<List<Finition>> findAllFinitionByService(@PathVariable Integer idService);
    @PostMapping("/finition/create")
    ResponseEntity<ServerResponse> createFinition(@RequestParam("finition") String finition) throws JsonProcessingException;
    @GetMapping("/finition/delete/{idFinition}")
    ResponseEntity<ServerResponse> deleteFinition(@PathVariable Integer idFinition);

    //Formes
    @GetMapping("/formes/all")
    ResponseEntity<List<Forme>> findAllForme();
    @GetMapping("/formes/byId/{id}")
    ResponseEntity<Forme> findFormeById(@PathVariable Integer id);
    @GetMapping("/formes/byservice/{idService}")
    ResponseEntity<List<Forme>> findAllFormeByService(@PathVariable Integer idService);
    @PostMapping("/formes/create")
    ResponseEntity<ServerResponse> createForme(@RequestParam("forme") String forme) throws JsonProcessingException;
    @GetMapping("/formes/delete/{idForme}")
    ResponseEntity<ServerResponse> deleteForme(@PathVariable Integer idForme);

    //Couleur
    @GetMapping("/couleur/all/byservice/{idService}")
    ResponseEntity<List<Couleur>> findAllCouleurByService(@PathVariable Integer idService);
    @GetMapping("/couleur/byId/{id}")
    ResponseEntity<Couleur> findCouleurById(@PathVariable Integer id);
    @PostMapping("/couleur/create")
    ResponseEntity<ServerResponse> createCouleur(@RequestParam("couleur") String couleur) throws JsonProcessingException;
    @GetMapping("/couleur/delete/{idCouleur}")
    ResponseEntity<ServerResponse> deleteCouleur(@PathVariable Integer idCouleur);

    //Faces
    @GetMapping("/faces/all/byservice/{idService}")
    ResponseEntity<List<Faces>> findAllFacesByService(@PathVariable Integer idService);
    @GetMapping("/faces/byId/{id}")
    ResponseEntity<Faces> findFacesById(@PathVariable Integer id);
    @PostMapping("/faces/create")
    ResponseEntity<ServerResponse> createFaces(@RequestParam("faces") String faces) throws JsonProcessingException;
    @GetMapping("/faces/delete/{idFaces}")
    ResponseEntity<ServerResponse> deleteFaces(@PathVariable Integer idFaces);


    //Facturation Finition
    @GetMapping("/facturation/byfinition/all/{id}")
    ResponseEntity<List<FacturationFinition>> findAllFacturationFinitionById(@PathVariable Integer id);
    @PostMapping("/facturation/finition/create")
    ResponseEntity<ServerResponse> createFacturationFinition(@RequestParam("facturationfinition") String facturationFinition) throws JsonProcessingException;
    @GetMapping("/facturation/finition/delete/{id}")
    ResponseEntity<ServerResponse> deleteFacturationFinition(@PathVariable Integer id);

    //Facturation Couleur
    @GetMapping("/facturation/bycouleur/all/{id}")
    ResponseEntity<List<FacturationCouleur>> findAllFacturationCouleurById(@PathVariable Integer id);
    @PostMapping("/facturation/couleur/create")
    ResponseEntity<ServerResponse> createFacturationCouleur(@RequestParam("facturationcouleur") String facturationCouleur) throws JsonProcessingException;
    @GetMapping("/facturation/couleur/delete/{id}")
    ResponseEntity<ServerResponse> deleteFacturationCouleur(@PathVariable Integer id);

}
