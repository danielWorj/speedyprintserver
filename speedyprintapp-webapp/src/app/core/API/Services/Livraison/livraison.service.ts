import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livraison } from '../../../Model/Commande/Livraison';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { ServerResponse } from '../../../Model/Server/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  constructor(private http:HttpClient) { }

  getAllLivraison():Observable<Livraison[]>{
    return this.http.get<Livraison[]>(SpeedyPrintEndPoint.Livraison.all);
  }

  createLivraison(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Livraison.create, request);
  }

  deleteLivraison(idLivraison:any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Livraison.delete+'/'+idLivraison);
  }

  countLivraison():Observable<number>{
    return this.http.get<number>(SpeedyPrintEndPoint.Livraison.count);
  }

  getAllServiceLivraison():Observable<string[]>{
    return this.http.get<string[]>(SpeedyPrintEndPoint.Livraison.allServiceList);
  }

  getAllQteServiceLivraison():Observable<number[]>{
    return this.http.get<number[]>(SpeedyPrintEndPoint.Livraison.allServiceCount);
  }

  getAllQteLivraisonByMonth():Observable<number[]>{
    return this.http.get<number[]>(SpeedyPrintEndPoint.Livraison.qteByMonth);
  }

  getAllMonthLivraison():Observable<string[]>{
    return this.http.get<string[]>(SpeedyPrintEndPoint.Livraison.allMonth);
  }
}
