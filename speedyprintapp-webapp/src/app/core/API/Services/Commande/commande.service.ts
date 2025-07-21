import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteVisite } from '../../../Model/Service/CarteVisite';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { DevisCarteVisite } from '../../../Model/Service/DevisCarteVisite';
import { ServerResponse } from '../../../Model/Server/ServerResponse';
import { Commande } from '../../../Model/Commande/Commande';
import { ImageCommande } from '../../../Model/Commande/ImageCommande';
import { EtatCommande } from '../../../Model/Commande/EtatCommande';
import { ConceptionCommmande } from '../../../Model/Commande/ConceptionCommande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private httpClient : HttpClient) { }

  getCarteVisiteAll():Observable<CarteVisite[]>{
    return this.httpClient.get<CarteVisite[]>(SpeedyPrintEndPoint.CarteVisite.all);
  }

  commandeCarteVisite(request:any):Observable<CarteVisite[]>{
    return this.httpClient.post<CarteVisite[]>(SpeedyPrintEndPoint.CarteVisite.commande, request);
  }

  //Devis Carte Visite
  createDevisCarteVisiste(request:any):Observable<ServerResponse>{
    return this.httpClient.post<ServerResponse>(SpeedyPrintEndPoint.DevisCarteVisite.create, request);
  }

  findDevisByCarte(idCarte :number):Observable<DevisCarteVisite>{
    return this.httpClient.get<DevisCarteVisite>(SpeedyPrintEndPoint.DevisCarteVisite.allByCarte+'/'+idCarte);
  }


  /*
  *   Commande service modifié 22/04/2025
  *
  * ****************************************/

  getAllCommande():Observable<Commande[]>{
    return this.httpClient.get<Commande[]>(SpeedyPrintEndPoint.Commande.all);
  }

  getAllCommandeByClient(idClient :any):Observable<Commande[]>{
    return this.httpClient.get<Commande[]>(SpeedyPrintEndPoint.Commande.allbyclient+'/'+idClient);
  }

  createCommande(request:any):Observable<ServerResponse>{
    return this.httpClient.post<ServerResponse>(SpeedyPrintEndPoint.Commande.create,request);
  }

  deleteCommande(idCommande:any):Observable<ServerResponse>{
    return this.httpClient.get<ServerResponse>(SpeedyPrintEndPoint.Commande.delete+'/'+idCommande);
  }

  getCountCommande():Observable<number>{
    return this.httpClient.get<number>(SpeedyPrintEndPoint.Commande.countall);
  }


  getCountByOriginCommande():Observable<number>{
    return this.httpClient.get<number>(SpeedyPrintEndPoint.Commande.countByOrigin);
  }


  getListAllServiceNameCommanded():Observable<string[]>{
    return this.httpClient.get<string[]>(SpeedyPrintEndPoint.Commande.allServiceList);
  }


  getListAllServiceCountCommanded():Observable<number[]>{
    return this.httpClient.get<number[]>(SpeedyPrintEndPoint.Commande.allServiceCount);
  }

  getListMonthCommande():Observable<string[]>{
    return this.httpClient.get<string[]>(SpeedyPrintEndPoint.Commande.allMonth);
  }

  getQteCommandeByMonth():Observable<number[]>{
    return this.httpClient.get<number[]>(SpeedyPrintEndPoint.Commande.qteByMonth);
  }

  getCommandeById(idCommande:any):Observable<Commande>{
    return this.httpClient.get<Commande>(SpeedyPrintEndPoint.Commande.findById+'/'+idCommande);
  }


  getAllImageByCommande(idCommande :any):Observable<ImageCommande[]>{
    return this.httpClient.get<ImageCommande[]>(SpeedyPrintEndPoint.Commande.ImageCommnde.byCommande+'/'+idCommande);
  }

  getAllEtatCommande():Observable<EtatCommande[]>{
    return this.httpClient.get<EtatCommande[]>(SpeedyPrintEndPoint.Commande.EtatCommande.all);
  }

  changeEtatCommande(idCommande : number , idEtat :number ):Observable<ServerResponse>{
    return this.httpClient.get<ServerResponse>(SpeedyPrintEndPoint.Commande.EtatCommande.changeEtat+'/'+idCommande+'/'+idEtat);
  }



  //Conception commande


  getAllConceptionCommande(idCommande:any):Observable<ConceptionCommmande[]>{
    return this.httpClient.get<ConceptionCommmande[]>(SpeedyPrintEndPoint.Commande.ConceptionConception.all+'/'+idCommande);
  }

  createConceptionCommande(request :any):Observable<ServerResponse>{
    return this.httpClient.post<ServerResponse>(SpeedyPrintEndPoint.Commande.ConceptionConception.create,request);
  }

  deleteConceptionCommande(idConceptionCommande:any):Observable<ServerResponse>{
    return this.httpClient.get<ServerResponse>(SpeedyPrintEndPoint.Commande.ConceptionConception.delete+'/'+idConceptionCommande);
  }


  //MAIL SERVICE

  sendEmailConception(request:any):Observable<ServerResponse>{
    return this.httpClient.post<ServerResponse>(SpeedyPrintEndPoint.TierService.mailsender,request);
  }
}

