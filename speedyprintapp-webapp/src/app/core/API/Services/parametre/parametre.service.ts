import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../../../Model/Parametre/Service';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { ModeImpression } from '../../../Model/Parametre/ModeImpression';
import { Format } from '../../../Model/Parametre/Format';
import { Dimension } from '../../../Model/Parametre/Dimension';
import { ServerResponse } from '../../../Model/Server/ServerResponse';
import { Conception } from '../../../Model/Parametre/Conception';
import { Impression } from '../../../Model/Parametre/Impression';
import { Server } from 'http';
import { TypePapier } from '../../../Model/Parametre/TypePapier';
import { Grammage } from '../../../Model/Parametre/Grammage';
import { Finition } from '../../../Model/Parametre/Finition';
import { Forme } from '../../../Model/Parametre/Formes';
import { CategorieService } from '../../../Model/Parametre/CategorieService';
import { Couleur } from '../../../Model/Parametre/Couleur';
import { Faces } from '../../../Model/Parametre/Faces';
import { FacturationFinition } from '../../../Model/Parametre/FacturationFinition';
import { FacturationCouleur } from '../../../Model/Parametre/FacturationCouleur';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http: HttpClient) { }

  //Service

  getAllService():Observable<Service[]>{
    return this.http.get<Service[]>(SpeedyPrintEndPoint.Parametrage.service.all);
  }

  getServiceById(idService :any):Observable<Service>{
    return this.http.get<Service>(SpeedyPrintEndPoint.Parametrage.service.byId+'/'+idService);
  }
  getAllServiceByCategorie(idCategorie :any):Observable<Service[]>{
    return this.http.get<Service[]>(SpeedyPrintEndPoint.Parametrage.service.bycategorieservice+'/'+idCategorie);
  }
  createService(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.service.create,request);
  }

  deleteService(idService:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.service.delete+'/'+idService);
  }

  //Categorie Service

  getAllCategorieService():Observable<CategorieService[]>{
    return this.http.get<CategorieService[]>(SpeedyPrintEndPoint.Parametrage.CategorieService.all);
  }

  createCategorieService(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.CategorieService.create,request);
  }

  deleteCategorieService(idCategorie:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.CategorieService.delete+'/'+idCategorie);
  }

  //Mode Impressin
  getAllModeImpression():Observable<ModeImpression[]>{
    return this.http.get<ModeImpression[]>(SpeedyPrintEndPoint.Parametrage.ModeImpression.all);
  }

  getModeImpressionById(idModeImpression:any):Observable<ModeImpression>{
    return this.http.get<ModeImpression>(SpeedyPrintEndPoint.Parametrage.ModeImpression.byId+'/'+idModeImpression);
  }

  getAllModeImpressionByService(idService :any):Observable<ModeImpression[]>{
    return this.http.get<ModeImpression[]>(SpeedyPrintEndPoint.Parametrage.ModeImpression.byService+'/'+idService);
  }

  createMModeImpression(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.ModeImpression.create,request);
  }


  deleteModeImpression(idMI:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.ModeImpression.delete+'/'+idMI);
  }


  //Format
  getAllFormat():Observable<Format[]>{
    return this.http.get<Format[]>(SpeedyPrintEndPoint.Parametrage.Format.all);
  }


  getFormatById(idFormat:any):Observable<Format>{
    return this.http.get<Format>(SpeedyPrintEndPoint.Parametrage.Format.byId+'/'+idFormat);
  }


  getAllFormatByService(idService :any):Observable<Format[]>{
    return this.http.get<Format[]>(SpeedyPrintEndPoint.Parametrage.Format.byservice+'/'+idService);
  }

  createFormat(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Format.create,request);
  }

  deleteFormat(idFormat:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Format.delete+'/'+idFormat);
  }


  //Dimension
  getAllDimension():Observable<Dimension[]>{
    return this.http.get<Dimension[]>(SpeedyPrintEndPoint.Parametrage.Dimension.all);
  }

  getDimensionById(idDimension:any):Observable<Dimension>{
    return this.http.get<Dimension>(SpeedyPrintEndPoint.Parametrage.Dimension.byId+'/'+idDimension);
  }

  getAllDimensionByService(idService :any):Observable<Dimension[]>{
    return this.http.get<Dimension[]>(SpeedyPrintEndPoint.Parametrage.Dimension.byservice+'/'+idService);
  }

  createDimension(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Dimension.create,request);
  }

  deleteDimension(idDimension:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Dimension.delete+'/'+idDimension);
  }


  //Conception
  getAllConception():Observable<Conception[]>{
    return this.http.get<Conception[]>(SpeedyPrintEndPoint.Parametrage.Conception.all);
  }
  getConceptionById(idConception : any):Observable<Conception>{
    return this.http.get<Conception>(SpeedyPrintEndPoint.Parametrage.Conception.byId+'/'+idConception);
  }

  getAllConceptionByService(idService :any):Observable<Conception[]>{
    return this.http.get<Conception[]>(SpeedyPrintEndPoint.Parametrage.Conception.allByService+'/'+idService);
  }

  createConception(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Conception.create,request);
  }

  deleteConception(idImpression:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Conception.delete+'/'+idImpression);
  }


  //Impression
  getAllImpression():Observable<Impression[]>{
    return this.http.get<Impression[]>(SpeedyPrintEndPoint.Parametrage.Impression.all);
  }

  getImpressionByService(idService :any):Observable<Impression[]>{
    return this.http.get<Impression[]>(SpeedyPrintEndPoint.Parametrage.Impression.byservice+'/'+idService);
  }


  getImpressionById(idImpression :any):Observable<Impression>{
    return this.http.get<Impression>(SpeedyPrintEndPoint.Parametrage.Impression.findById+'/'+idImpression);
  }



  createImpression(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Impression.create,request);
  }

  deleteImpression(idImpression:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Impression.delete+'/'+idImpression);
  }


   //TypePapier
   getAllTypePapier():Observable<TypePapier[]>{
    return this.http.get<TypePapier[]>(SpeedyPrintEndPoint.Parametrage.TypePapier.all);
  }

  getTypePapierById(idTypePapier:any):Observable<TypePapier>{
    return this.http.get<TypePapier>(SpeedyPrintEndPoint.Parametrage.TypePapier.byId+'/'+idTypePapier);
  }

  getAllTypePapierByService(idService :any):Observable<TypePapier[]>{
    return this.http.get<TypePapier[]>(SpeedyPrintEndPoint.Parametrage.TypePapier.byservice+'/'+idService);
  }

  createTypePapier(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.TypePapier.create,request);
  }

  deleteTypePapier(idTypePapier:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.TypePapier.delete+'/'+idTypePapier);
  }

  //Grammage
  getAllGrammage():Observable<Grammage[]>{
    return this.http.get<Grammage[]>(SpeedyPrintEndPoint.Parametrage.Grammage.all);
  }
  getGrammageById(idGrammage:any):Observable<Grammage>{
    return this.http.get<Grammage>(SpeedyPrintEndPoint.Parametrage.Grammage.byId+'/'+idGrammage);
  }

  getAllGrammageByService(idService :any):Observable<Grammage[]>{
    return this.http.get<Grammage[]>(SpeedyPrintEndPoint.Parametrage.Grammage.byservice+'/'+idService);
  }

  createGrammager(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Grammage.create,request);
  }

  deleteGrammage(idGrammage:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Grammage.delete+'/'+idGrammage);
  }

  //Finition
  getAllFinition():Observable<Finition[]>{
    return this.http.get<Finition[]>(SpeedyPrintEndPoint.Parametrage.Finition.all);
  }


  getFinitionById(idFinition:any):Observable<Finition>{
    return this.http.get<Finition>(SpeedyPrintEndPoint.Parametrage.Finition.byId+'/'+idFinition);
  }

  getAllFinitionByService(idService :any):Observable<Finition[]>{
    return this.http.get<Finition[]>(SpeedyPrintEndPoint.Parametrage.Finition.byservice+'/'+idService);
  }

  createFinition(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Finition.create,request);
  }

  deleteFinition(idFinition:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Finition.delete+'/'+idFinition);
  }


  //Forme
  getAllForme():Observable<Forme[]>{
    return this.http.get<Forme[]>(SpeedyPrintEndPoint.Parametrage.Formes.all);
  }


  getFormeById(idForme:any):Observable<Forme>{
    return this.http.get<Forme>(SpeedyPrintEndPoint.Parametrage.Formes.byId+'/'+idForme);
  }

  getAllFormeByService(idService :any):Observable<Forme[]>{
    return this.http.get<Forme[]>(SpeedyPrintEndPoint.Parametrage.Formes.byservice+'/'+idService);
  }

  createForme(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Formes.create,request);
  }

  deleteForme(idForme:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Formes.delete+'/'+idForme);
  }


  //Couleur
  getAllCouleurByService(idService :any):Observable<Couleur[]>{
    return this.http.get<Couleur[]>(SpeedyPrintEndPoint.Parametrage.Couleurs.allByService+'/'+idService);
  }
  getCouleurById(idCouleur:any):Observable<Couleur>{
    return this.http.get<Couleur>(SpeedyPrintEndPoint.Parametrage.Couleurs.byId+'/'+idCouleur);
  }
  createCouleur(request :any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Couleurs.create,request);
  }

  deleteCouleur(idCouleur :any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Couleurs.delete+'/'+idCouleur);
  }


  //Faces
  getAllFacesByService(idService:any):Observable<Faces[]>{
    return this.http.get<Faces[]>(SpeedyPrintEndPoint.Parametrage.Faces.allByService+'/'+idService);
  }

  getFacesById(idFace:any):Observable<Faces>{
    return this.http.get<Faces>(SpeedyPrintEndPoint.Parametrage.Faces.byId+'/'+idFace);
  }
  createFaces(request :any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Faces.create,request);
  }

  deleteFaces(idFaces :any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.Faces.delete+'/'+idFaces);
  }


  //Facturation Finition
  getFacturationFinitionByIdFinition(idFinition :any):Observable<FacturationFinition[]>{
    return this.http.get<FacturationFinition[]>(SpeedyPrintEndPoint.Parametrage.FacturationFinition.allByIdFinition+'/'+idFinition);
  }

  createFacturationFinition(request :any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.FacturationFinition.create,request);
  }

  delereFacturationFinition(idFacturationFinition :any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.FacturationFinition.delete+'/'+idFacturationFinition);
  }

  //Facturation Couleur

  getFacturationCouleurById(idCouleur:any):Observable<FacturationCouleur[]>{
    return this.http.get<FacturationCouleur[]>(SpeedyPrintEndPoint.Parametrage.FacturationCouleur.allByIdCouleur+'/'+idCouleur);
  }

  createFacturationCouleur(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Parametrage.FacturationCouleur.create,request);
  }

  deleteFacturationCouleur(idCouleur:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Parametrage.FacturationCouleur.delete+'/'+idCouleur);
  }
}
