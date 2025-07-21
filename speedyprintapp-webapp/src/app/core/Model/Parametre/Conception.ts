import { Service } from "./Service";
import { TypeConception } from "./TypeConception";

export class Conception{
  idConception ?:number;
  typeConception !:TypeConception;
  montant!:number;
  service!:Service;
}
