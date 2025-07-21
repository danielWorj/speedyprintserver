import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../Model/Client/Client';
import { SpeedyPrintEndPoint } from '../../EndPoint';
import { Message } from '../../../Model/Chat/Message';
import { ServerResponse } from '../../../Model/Server/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http :HttpClient) { }

  getClientSendMessage():Observable<Client[]>{
    return this.http.get<Client[]>(SpeedyPrintEndPoint.Chat.allClient);
  }

  getAllMessageByClient(id : number):Observable<Message[]>{
    return this.http.get<Message[]>(SpeedyPrintEndPoint.Chat.allByClient+'/'+id);
  }

  sendMessage(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Chat.sendMessage,request);
  }

  udpateMessage(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(SpeedyPrintEndPoint.Chat.sendMessage,request);
  }


}
