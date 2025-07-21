import { Commande } from "./Commande";
import { Face } from "./Face";

export class ImageCommande {
  idImage?:number ;
  url !:string;
  face !:Face;
  commande !:Commande;
}
