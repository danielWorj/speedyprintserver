import { Offre } from './../../../Model/Abonnement/Offre';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abonnement } from '../../../Model/Abonnement/Abonnement';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { ServerResponse } from '../../../Model/Server/ServerResponse';
import { DetailsOffre } from '../../../Model/Abonnement/DetailsOffre';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private http:HttpClient) { }

  getAllAbonnement():Observable<Abonnement[]>{
    return this.http.get<Abonnement[]>(SpeedyPrintEndPoint.Abonnement.all);
  }

  createAbonnement(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Abonnement.create,request);
  }

  updateAbonnement(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Abonnement.update,request);
  }

  deletAbonnement(idAbonnement :any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Abonnement.delete+'/'+idAbonnement);
  }

  getAllByClient(idClient :any):Observable<Abonnement[]>{
    return this.http.get<Abonnement[]>(SpeedyPrintEndPoint.Abonnement.allByClient+'/'+idClient);
  }

  getAllByOffre(idOffre:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Abonnement.allByOffre+'/'+idOffre);
  }

  //Offre

  getAllOffre():Observable<Offre[]>{
    return this.http.get<Offre[]>(SpeedyPrintEndPoint.Offre.all);
  }

  createOffre(request :any):Observable<Offre>{
    return this.http.post<Offre>(SpeedyPrintEndPoint.Offre.create,request);
  }


  updateOffre(request :any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Offre.update,request);
  }

  deleteOffre(idOffre:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Offre.delete+'/'+idOffre);
  }

  //Details offre

  getAllDetailOffre(idOffre :any):Observable<DetailsOffre[]>{
    return this.http.get<DetailsOffre[]>(SpeedyPrintEndPoint.DetailsOffre.all+'/'+idOffre);
  }

  createDetailsOffre(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.DetailsOffre.create, request);
  }

  updateDetailsOffre(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.DetailsOffre.update, request);
  }

  deleteDetailsOffre(idDetailsOffre:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.DetailsOffre.delete+'/'+idDetailsOffre);
  }
}
