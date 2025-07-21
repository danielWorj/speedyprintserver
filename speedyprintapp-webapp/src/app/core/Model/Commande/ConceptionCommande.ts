import { Commande } from "./Commande";

export class ConceptionCommmande{
  idConception ?:number;
  date !:string;
  url !:string;
  commande!:Commande;
  message ?:string;
  dateMisAJour ?:string ;
}
