import { Client } from "../Client/Client";

export class CarteVisite{
  idCarteVisite !:number ;
  nomPrenom ?:String ;
  entreprise ?:String;
  fonction ?:String ;
  localisation ?:String ;
  description ?:String ;
  quantite ?:String ;
  plastification ?:String ;
  decoupe ?:String;
  dateLivraison ?:String;
  image ?:String;

  client !:Client;
}
