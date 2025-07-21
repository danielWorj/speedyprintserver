import { CategorieService } from "./CategorieService";

export class Service {
  idServices ?:number ;
  intitule !:string ;
  description !:string ;
  image !:string;
  date !:string;
  forfait !:boolean;
  categorieService !:CategorieService;
}
