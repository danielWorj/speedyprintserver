import { Conception } from "./Conception";
import { Couleur } from "./Couleur";
import { Dimension } from "./Dimension";
import { Faces } from "./Faces";
import { Finition } from "./Finition";
import { Format } from "./Format";
import { Forme } from "./Formes";
import { Grammage } from "./Grammage";
import { ModeImpression } from "./ModeImpression";
import { Service } from "./Service";
import { TypePapier } from "./TypePapier";

export class Impression {
  idImpression ?:number ;
  borneInferieure !:number ;
  borneSuperieure !:number ;
  remise!:number;
  montant!:number;
  service !:Service;

  modeImpression !:ModeImpression;
  dimension!:Dimension;
  format!:Format;
  conception!:Conception;
  typePapier ?:TypePapier;
  face ?: Faces;
  couleur ?:Couleur;
  grammage ? : Grammage;
  finition ?:Finition ;
  forme ? : Forme ;
}
