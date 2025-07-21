import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../Model/Client/Client';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { ServerResponse } from '../../../Model/Server/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http :HttpClient) { }

  getAllClient():Observable<Client[]>{
    return this.http.get<Client[]>(SpeedyPrintEndPoint.Client.all);
  }

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(SpeedyPrintEndPoint.Client.byId+'/'+id);
  }

  createClient(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Client.create,request);
  }

  udpateClient(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Client.update,request);
  }

  deleteClient(idClient :any):Observable<ServerResponse>{
    return this.http.get<ServerResponse>(SpeedyPrintEndPoint.Client.delete+'/'+idClient);
  }

  countClient():Observable<number>{
    return this.http.get<number>(SpeedyPrintEndPoint.Client.count);
  }
}
