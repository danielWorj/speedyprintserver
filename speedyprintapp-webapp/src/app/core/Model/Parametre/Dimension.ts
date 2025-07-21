import { Service } from "./Service";

export class Dimension {
  idDimension ?:number ;
  intitule !:string ;
  taille !:string;
  service !:Service;
  valeurAjout ?:number ;
  valeurMultiplication ? : number ;
}
