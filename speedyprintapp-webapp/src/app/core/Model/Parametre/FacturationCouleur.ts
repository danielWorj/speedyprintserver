import { Couleur } from "./Couleur";

export class FacturationCouleur{
   idFacturationCouleur ?: number ;

  couleur!:Couleur;

  valeurAjout ?:number ;
  valeurMultiplication ? : number ;

  borneInferieure ? : number ;
  borneSuperieure ? : number ;
}
