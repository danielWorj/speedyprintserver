import { Commande } from "./Commande";

export class Livraison {
  idLivraison ?:number ;
  destination !:string;
  commande !:Commande;
  etat !:string;
  localDate !:string; // date de livraison réelle
}
