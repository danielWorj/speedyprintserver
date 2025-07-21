import { Client } from "../Client/Client";

export class Message {
  idMessage ?:number ;
  content ?:string;
  statut ?:string ;
  localDate ?:string;
  client ?:Client;
}
