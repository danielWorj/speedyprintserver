import { Client } from "../Client/Client";
import { Offre } from "./Offre";

export class Abonnement{
  idAbonnement ?:number;
  client !:Client ;
  offre !:Offre;
  date ?:string;
  dateFin ?:string;
}
