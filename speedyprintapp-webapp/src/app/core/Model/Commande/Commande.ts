import { TypePapier } from './../Parametre/TypePapier';
import { Client } from "../Client/Client";
import { Conception } from "../Parametre/Conception";
import { Dimension } from "../Parametre/Dimension";
import { Format } from "../Parametre/Format";
import { Impression } from "../Parametre/Impression";
import { ModeImpression } from "../Parametre/ModeImpression";
import { Service } from "../Parametre/Service";
import { EtatCommande } from "./EtatCommande";
import { Grammage } from '../Parametre/Grammage';
import { Finition } from '../Parametre/Finition';
import { Forme } from '../Parametre/Formes';

export class Commande{
  constructor(){}

  idCommande ?:number ;
  quantite !:number ;
  dateLivraison !:string ;
  dateCreation !:string ;
  origin!:boolean;
  description !:string;

  service !:Service;
  client !:Client;
  etatCommande !:EtatCommande;
  modeImpression !:ModeImpression;
  dimension!:Dimension;
  format!:Format;
  conception!:Conception;
  impression ! :Impression;
  typePapier ?:TypePapier;
  grammage ? : Grammage;
  finition ?:Finition ;
  forme ? : Forme ;
}

const commande : Commande = new Commande();
