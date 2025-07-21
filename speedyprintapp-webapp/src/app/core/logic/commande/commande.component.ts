import { Conception } from './../../Model/Parametre/Conception';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { CarteVisite } from '../../Model/Service/CarteVisite';
import { CommandeService } from '../../API/Services/Commande/commande.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import { DevisCarteVisite } from '../../Model/Service/DevisCarteVisite';
import { Commande } from '../../Model/Commande/Commande';
import { ClientService } from '../../API/Services/Client/client.service';
import { ParametreService } from '../../API/Services/parametre/parametre.service';
import { Client } from '../../Model/Client/Client';
import { Service } from '../../Model/Parametre/Service';
import { ModeImpression } from '../../Model/Parametre/ModeImpression';
import { Dimension } from '../../Model/Parametre/Dimension';
import { Format } from '../../Model/Parametre/Format';
import { ImageCommande } from '../../Model/Commande/ImageCommande';
import { EtatCommande } from '../../Model/Commande/EtatCommande';
import { Impression } from '../../Model/Parametre/Impression';
import { ConceptionCommmande } from '../../Model/Commande/ConceptionCommande';
import { DatePipe } from '@angular/common';
import { TypePapier } from '../../Model/Parametre/TypePapier';
import { Grammage } from '../../Model/Parametre/Grammage';
import { Finition } from '../../Model/Parametre/Finition';
import { Forme } from '../../Model/Parametre/Formes';
import { Couleur } from '../../Model/Parametre/Couleur';
import { Faces } from '../../Model/Parametre/Faces';
import { Cinetpay, PaymentConfig } from '@azinakou/cinetpay';
import { Console } from 'console';
import { FacturationFinition } from '../../Model/Parametre/FacturationFinition';
import { FacturationCouleur } from '../../Model/Parametre/FacturationCouleur';

Chart.register(...registerables);

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{
  carteVisiteFb! : FormGroup;

  devisCarteFb !: FormGroup;

  commandeFb !: FormGroup;

  conceptionCommandeFb !: FormGroup;
  messageFb !:FormGroup;

  constructor(
    private commandeService : CommandeService ,
    private fb : FormBuilder,
    private clientService : ClientService ,
    private serviceApi : ParametreService ,
    private parametreService: ParametreService
  ){
    this.carteVisiteFb = this.fb.group({
      idCarteVisite : new FormControl(),
      nomPrenom : new FormControl(),
      entreprise : new FormControl(),
      fonction : new FormControl(),
      localisation : new FormControl(),
      description : new FormControl(),
      quantite : new FormControl(),
      plastification : new FormControl(),
      decoupe : new FormControl(),
      dateLivraison : new FormControl(),
      image : new FormControl(),
      client : new FormControl(),
    });

    this.devisCarteFb = this.fb.group({
      idDevis : new FormControl(),
      montant : new FormControl(),
      carteVisite : new FormControl(),
      description : new FormControl()
    });

    this.commandeFb = this.fb.group({
      idCommande : new FormControl(),
      quantite : new FormControl(),
      dateLivraison : new FormControl(),
      dateCreation : new FormControl(),
      origin : new FormControl(),
      description :new FormControl(),
      service : new FormControl(),
      client : new FormControl(),
      etatCommande : new FormControl(),
      modeImpression : new FormControl(),
      dimension : new FormControl(),
      format : new FormControl(),
      conception : new FormControl(),
      face : new FormControl(),
      impression :new FormControl(),
      typePapier : new FormControl(),
      grammage : new FormControl(),
      finition : new FormControl(),
      couleur : new FormControl(),
      forme : new FormControl(),
    });


    this.conceptionCommandeFb = this.fb.group({
      idConception : new FormControl(),
      date : new FormControl(),
      url : new FormControl(),
      commande : new FormControl()
    });


    this.messageFb = this.fb.group({
      toEmail : new FormControl(),
      subject : new FormControl(),
      body : new FormControl(),
    })
   }
  ngOnInit(): void {
    //alert('Reverifier les prixs en fonction de la finition et adapter en fonction de la couleur ');
      this.refrehPage();
  }


  refrehPage(){


      this.getAllCommande();
      this.getAllClient();
      this.getAllService();
      this.getAllEtatCommande();

      this.getStringListServiceCommande();
      this.getNombreListServiceCommande();

      this.getNombreOfCommande();
      this.getNombreOfCommandeByMob();

      this.getStringListMonthCommande();
      this.getQuantiteCommandeByMonth();
      //this.graphCommandeParQte();


  }

  getAllCommandeByClient(idClient :any){
    this.commandeService.getAllCommandeByClient(idClient).subscribe({
      next : (data:Commande[])=>{
        this.listCommande = data;
      },
      error : ()=>{
        console.log('List commande fecth : failed');
      }

    });
  }

  openChart(){
    this.graphCommandeParQte();
    this.graphCommandeParMois();

  }



  listCommande : Commande[] = [];
  getAllCommande(){
    this.listCommande.length ==0;
    this.commandeService.getAllCommande().subscribe({
      next : (data:Commande[])=>{
        this.listCommande = data;

      },
      error : ()=>{
        console.log('List commande fecth : failed');
      }

    })
  }



  listClient : Client[] = [];

  getAllClient(){
    this.clientService.getAllClient().subscribe({
      next : (data : Client[])=>{
        this.listClient = data ;
      },
      error : ()=>{
        console.log('get client : failed');
      }
    })
  }

  listModeImpression : ModeImpression[] = [];
  getListModeImpressionByService(idService :any){
    this.serviceApi.getAllModeImpressionByService(idService).subscribe({
      next : (data : ModeImpression[])=>{
        this.listModeImpression = data;
        this.facturation();
        console.log(this.listModeImpression)
      },
      error : ()=>{
        console.log('Fetch mode impression : failed');
      }
    })
  }


  listDimension : Dimension[] = [];
  getListDimensionByService(idService :any){
    this.serviceApi.getAllDimensionByService(idService).subscribe({
      next : (data : Dimension[])=>{
        this.listDimension = data;
      },
      error : ()=>{
        console.log('Fetch mode dimension : failed');
      }
    })
  }

  listFormat : Format[] = [] ;
  getListFormatByService(idService :any){
    this.serviceApi.getAllFormatByService(idService).subscribe({
      next : (data : Format[])=>{
        this.listFormat = data;
      },
      error : ()=>{
        console.log('Fetch mode dimension : failed');
      }
    })
  }

  getParametre(event :any){
    let idService = event.target.value ;

    this.getServiceCommandeById(idService);

    this.getListModeImpressionByService(idService);
    this.getListDimensionByService(idService);
    this.getAllFinitionByService(idService);
    this.getAllFormeByService(idService);
    this.getAllGrammageByService(idService);
    this.getAllTypePapierByService(idService);
    this.getAllFaceByService(idService);
    this.getAllCouleurByService(idService);

    this.getAllConception();
    this.getAllImpressionByService(idService);

    this.getPrixParDefaut();

  }

  serviceSelected : Service = new Service();
  getServiceCommandeById(idService :any){
    this.parametreService.getServiceById(idService).subscribe({
      next : (data :Service)=>{
        this.serviceSelected = data;
      },
      error : ()=>{
        console.log('service by id : dfailed');
      }
    })
  }
  listService : Service[] = [];

  getAllService(){
    this.serviceApi.getAllService().subscribe({
      next : (data : Service[])=>{
        this.listService = data ;
      },
      error : ()=>{
        console.log('get service : failed');
      }
    })
  }

  idCommandeSelected : number = 0;
  selectCommande(c:Commande){

    this.idCommandeSelected = c.idCommande!;

    this.commandeFb.controls['idCommande'].setValue(c.idCommande);
    this.commandeFb.controls['quantite'].setValue(c.quantite);
    this.commandeFb.controls['dateLivraison'].setValue(c.dateLivraison);
    this.commandeFb.controls['dateCreation'].setValue(c.dateCreation);
    this.commandeFb.controls['origin'].setValue(c.origin);
    this.commandeFb.controls['service'].setValue(c.service.idServices);
    this.commandeFb.controls['client'].setValue(c.client.idUser);
  }

  imageRectoToSend!:File;

  onSelectImage(e :any){
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{
        this.imageRectoToSend = e.target.files[0];
      }

    }
  }

  imageRectoVersoToSend!:File;

  onSelectImageVerso(e :any){
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{
        this.imageRectoVersoToSend = e.target.files[0];
      }

    }
  }


  createCommande(){
    const formData : FormData = new FormData();

    formData.append("commande",JSON.stringify(this.commandeFb.value));
    formData.append("file", this.imageRectoToSend);
    formData.append("fileVerso", this.imageRectoVersoToSend);

    this.commandeService.createCommande(formData).subscribe({
      next : (data : ServerResponse)=>{
        alert(data.message);
        this.commandeFb.reset();
        this.refrehPage();
      },
      error : ()=>{
        console.log('Cretion commande : erreur');
      }
    });

  }

  nombreOfCommande : number = 0 ;
  getNombreOfCommande(){
    this.commandeService.getCountCommande().subscribe({
      next : (data : number)=>{
        this.nombreOfCommande = data ;
      },
      error : ()=>{
        console.log('get nombre of : failed');
      }
    });
  }


  nombreOfCommandeByMob : number = 0 ;
  getNombreOfCommandeByMob(){
    this.commandeService.getCountByOriginCommande().subscribe({
      next : (data : number)=>{
        this.nombreOfCommandeByMob = data ;
      },
      error : ()=>{
        console.log('get nombre from mobile of : failed');
      }
    });
  }

  listServiceCommande : string[] = [];
  getStringListServiceCommande(){
    this.commandeService.getListAllServiceNameCommanded().subscribe({
      next : (data : string[])=>{
        for (let index = 0; index < data.length; index++) {
          this.listServiceCommande.push(data[index]) ;
        }
      },
      error : ()=>{
        console.log('get list service of commande : failed');
      }
    });
  }


  listNombreServiceCommande : number[] = [];
  getNombreListServiceCommande(){
    this.commandeService.getListAllServiceCountCommanded().subscribe({
      next : (data : number[])=>{
        for (let index = 0; index < data.length; index++) {
          this.listNombreServiceCommande.push(data[index]) ;
        }
      },
      error : ()=>{
        console.log('get count service of commande : failed');
      }
    });

  }

  graphCommandeParQte(){


    let ctx= document.getElementById('chartCommandeQte');

    new Chart(ctx as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: this.listServiceCommande,

        datasets: [{
          data: this.listNombreServiceCommande,
          backgroundColor: [
            'rgba(54, 162 , 235 , 0.5)',
            'rgba(255, 206 , 86 , 0.5)',
            'rgba(75, 192 , 192 , 0.5)',
            'rgba(153, 102 , 255 , 0.5)',
            'rgba(255, 159 , 64 , 0.5)',
          ],
          borderWidth: 1,
        }],


      },

    });


  }

  listMonthHaveCommande : string[] = [];
  getStringListMonthCommande(){
    this.commandeService.getListMonthCommande().subscribe({
      next : (data : string[])=>{
        for (let index = 0; index < data.length; index++) {
          this.listMonthHaveCommande.push(data[index]) ;
        }
        console.log(this.listMonthHaveCommande);
      },
      error : ()=>{
        console.log('get list service of commande : failed');
      }
    });
  }


  listQuantiteCommandeByMonth : number[] = [];
  getQuantiteCommandeByMonth(){
    this.commandeService.getQteCommandeByMonth().subscribe({
      next : (data : number[])=>{
        for (let index = 0; index < data.length; index++) {
          this.listQuantiteCommandeByMonth.push(data[index]) ;
        }
        console.log(this.listQuantiteCommandeByMonth);
      },
      error : ()=>{
        console.log('get count service of commande : failed');
      }
    });
  }


  graphCommandeParMois(){

    let ctx= document.getElementById('chartCommandeMois');
    new Chart(ctx as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: this.listMonthHaveCommande,
        datasets: [{
          data: this.listQuantiteCommandeByMonth,
          backgroundColor: [
            'rgba(255, 99 , 132 , 0.5)',
            'rgba(54, 162 , 235 , 0.5)',
            'rgba(255, 206 , 86 , 0.5)',
            'rgba(75, 192 , 192 , 0.5)',
            'rgba(153, 102 , 255 , 0.5)',
            'rgba(255, 159 , 64 , 0.5)',
          ],
          borderWidth: 1,
        }],


      },

    });


  }

  isCreation : boolean = false ;
  sendToCreation(){
    this.isCreation = true;
    this.isEndConception = false ;
    this.isViewCommande = false;

  }




  commandeSelected : Commande =  new Commande() ;
  isViewCommande:boolean = false ;

  sendToViewPage(){
    this.isViewCommande = true ;
    this.isCreation = false ;

  }

  emailClientSelected : string = '';
  sendToConsultCommande(c:Commande){
    this.isCreation = false;
    this.isViewCommande = true;
    this.isEndConception = false;
    this.selectCommande(c);
    this.getCommandebyId(c);

  }
  getCommandebyId(c:Commande){


    this.commandeSelected = <Commande>{};

    this.commandeService.getCommandeById(c.idCommande).subscribe({
      next : (data :Commande)=>{
        this.commandeSelected = data;
        this.emailClientSelected = this.commandeSelected.client.email;
        console.log(this.commandeSelected);
        this.getAllImageCommande(c.idCommande);
      },
      error  : ()=>{
        console.log('Commande By Id : failed');
      }
    })
  }

  listImageCommande : ImageCommande[] = [];
  getAllImageCommande(idCommande:any){
    this.commandeService.getAllImageByCommande(idCommande).subscribe({
      next : (data:ImageCommande[])=>{
        this.listImageCommande = data;
        console.log('image commande');

        console.log(this.listImageCommande);
      },
      error :()=>{
        console.log('list image commande : failed');
      }
    })
  }

  isEndConception : boolean = false ;
  callEndConceptionView(c:Commande){
    this.isCreation = false;
    this.isEndConception = true;
    this.isViewCommande = false ;

    this.imageUrl = '';

    this.selectCommande(c);

    this.getAllConceptionCommande();

    this.getCommandebyId(c);

  }
  isChangeEtat : boolean = false ;
  callChangeEtataView(){
    this.isChangeEtat = true;
    this.getAllEtatCommande();

  }

  eventChangeEtatCommande(e:any){
    let idEtat = e.target.value;
    this.changeEtatCommande(idEtat);
  }
  changeEtatCommande(idEtat:any){

    this.commandeService.changeEtatCommande(this.idCommandeSelected,idEtat).subscribe({
      next: (data:ServerResponse)=>{
        alert('La commande entre dans un nouvel état');
        this.ngOnInit();
      },
      error: ()=>{
        console.log('Change etat commande: failed');
      }
    })

  }

  listEtatCommande :EtatCommande[] = [];
  getAllEtatCommande(){
    this.commandeService.getAllEtatCommande().subscribe({
      next:(data:EtatCommande[])=>{
        this.listEtatCommande = data;
        console.log(this.listEtatCommande);
      },
      error : ()=>{
        console.log('List etat commande: failed');
      }
    })
  }


  listConception : Conception[] = [];
  getAllConception(){
    this.parametreService.getAllConception().subscribe({
      next : (data:Conception[])=>{
        this.listConception = data;
      },
      error :()=>{
        console.log('Conception  list :failed');
      }
    })
  }


  listImpression : Impression[] = [];
  getAllImpressionByService( idService : any){

    this.parametreService.getImpressionByService(idService).subscribe({
      next : (data:Impression[])=>{
        this.listImpression = data;
        this.getPrixParDefaut();
      },
      error :()=>{
        console.log('Impression  list :failed');
      }
    })
  }



  //Conception commande

  listConceptionCommande : ConceptionCommmande[] = [];
  getAllConceptionCommande(){

    this.commandeService.getAllConceptionCommande(this.idCommandeSelected).subscribe({
      next: (data:ConceptionCommmande[])=>{
        //this.listConceptionCommande.splice(0,this.listConceptionCommande.length);

        this.listConceptionCommande = data;
        console.log(this.listConceptionCommande);

        console.log('list conception : '+ this.listConceptionCommande);
      },
      error : ()=>{
        console.log('List conception commande : failed');
      }
    })
  }

  imageConception !:File ;
  seeImage : boolean = false ;
  imageUrl : string = '';
  onSelectImageConception(e :any){
    this.seeImage = true;

    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{

        this.imageUrl = event.target.result ;

        this.imageConception = e.target.files[0];
      }

    }
  }

  craeteConceptionCommande(){
    this.conceptionCommandeFb.controls['commande'].setValue(this.idCommandeSelected);

    const formData : FormData = new FormData();

    console.log(this.conceptionCommandeFb.value);

    formData.append("conceptioncommande", JSON.stringify(this.conceptionCommandeFb.value));
    formData.append("file",this.imageConception);

    this.commandeService.createConceptionCommande(formData).subscribe({

      next : (data:ServerResponse)=>{
        if (data.success) {
          alert(data.message);
          this.getAllConceptionCommande();

          this.changeEtatCommande(1);
        }
      },
      error : ()=>{
        console.log('Erreur de creation conception commande');
      }
    });

  }


  subject :string = 'CONFIRMATION DE CONCEPTION';
  sendEmail(){
    // emailjs.send('service_5l5yv1v','template_97e48qh', {...this.form} , {
    //   publicKey : '3pzAoal_iu1vvQ0wB'
    // }).then(()=>{
    //     console.log('Sent');
    // });

    this.messageFb.controls['subject'].setValue(this.subject);



    console.log(this.messageFb.value);
    const formData :FormData = new FormData();

    formData.append("mail", JSON.stringify(this.messageFb.value));

    this.commandeService.sendEmailConception(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          alert(data.message);
        }
      }
    })
  }


  deleteCommande(idCommande : any){
    this.commandeService.deleteCommande(idCommande).subscribe({
      next: (data:ServerResponse)=>{
        alert(data.message);
      },
      error: ()=>{
        console.log('Delete commande : failed');
      }
    })
  }

  //Gestiob de la facturation

  conceptionForService : Conception = new Conception();
  idConceptionSelected : number = 0 ;
  prixConception : number = 0;
  getConceptionByService(idService :any){

    this.parametreService.getConceptionById(idService.target.value).subscribe({
      next : (data:Conception)=>{
        this.conceptionForService =data;
        this.prixConception = this.conceptionForService.montant ;
        this.idConceptionSelected = this.conceptionForService.idConception!;
        this.getPriceConception();
        //console.log(this.impressionForService);
      },
      error : ()=>{
        console.log('Erreur fecth all Impression');
      }
    });
  }

  idImpressionSelected : number = 0 ;
  // getImpressionByService(idService :any){
  //   this.parametreService.getImpressionByService(idService).subscribe({
  //     next : (data:Impression[])=>{
  //       this.listImpression =data;
  //      // this.montantNet =data.montant;
  //       console.log(this.impressionForService);
  //     },
  //     error : ()=>{
  //       console.log('Erreur fecth all Impression');
  //     }
  //   });
  // }

  montantNet : number = 0.0;
  // facturation(){
  //    function checkout() {
  //           CinetPay.setConfig({
  //               apikey: '9731034965f9bc09a0df37.94572735',//   YOUR APIKEY
  //               site_id: '414161',//YOUR_SITE_ID
  //               notify_url: 'http://mondomaine.com/notify/',
  //               mode: 'PRODUCTION'
  //           });
  //           CinetPay.getCheckout({
  //               transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
  //               amount: 100,
  //               currency: 'XAF',
  //               channels: 'ALL',
  //               description: 'Test de paiement',
  //                //Fournir ces variables pour le paiements par carte bancaire
  //               customer_name:"Joe",//Le nom du client
  //               customer_surname:"Down",//Le prenom du client
  //               customer_email: "down@test.com",//l'email du client
  //               customer_phone_number: "088767611",//l'email du client
  //               customer_address : "BP 0024",//addresse du client
  //               customer_city: "Antananarivo",// La ville du client
  //               customer_country : "CM",// le code ISO du pays
  //               customer_state : "CM",// le code ISO l'état
  //               customer_zip_code : "06510", // code postal

  //           });
  //           CinetPay.waitResponse(function(data) {
  //               if (data.status == "REFUSED") {
  //                   if (alert("Votre paiement a échoué")) {
  //                       window.location.reload();
  //                   }
  //               } else if (data.status == "ACCEPTED") {
  //                   if (alert("Votre paiement a été effectué avec succès")) {
  //                       window.location.reload();
  //                   }
  //               }
  //           });
  //           CinetPay.onError(function(data) {
  //               console.log(data);
  //           });
  //       }
  // }

  impressionSelected : Impression = new Impression();

  getImpressionById(idImpression :any){
    console.log('idImpression:'+idImpression.target.value);
    this.parametreService.getImpressionById(idImpression.target.value).subscribe({
      next : (data : Impression)=>{
        this.impressionSelected = data ;
      },
      error : ()=>{
        console.log('Impression by id : failed');
      }
    })
  }


  modeImpressionSelected : ModeImpression = new ModeImpression();

  getModeImpressionById(idModeImpression :any){
    this.parametreService.getModeImpressionById(idModeImpression.target.value).subscribe({
      next : (data : ModeImpression)=>{
        this.modeImpressionSelected = data ;
        this.facturation();

        console.log(data);
      },
      error : ()=>{
        console.log('Mode Impression by id : failed');
      }
    })
  }


  formatSelected : Format = new Format();

  getFormatById(idFormat :any){
    this.parametreService.getFormatById(idFormat.target.value).subscribe({
      next : (data : Format)=>{
        this.formatSelected = data ;
        this.facturation();

        console.log(data);

      },
      error : ()=>{
        console.log('Format by id : failed');
      }
    })
  }

 dimensionSelected :Dimension = new Dimension();

  getDimensionById(idDimension :any){
    this.parametreService.getDimensionById(idDimension.target.value).subscribe({
      next : (data :Dimension)=>{
        this.dimensionSelected = data ;
        this.facturation();

        console.log(data);

      },
      error : ()=>{
        console.log('Dimension by id : failed');
      }
    })
  }

  typePapierSelected :TypePapier = new TypePapier();

  getTypePapierById(idTypePapier :any){
    this.parametreService.getTypePapierById(idTypePapier.target.value).subscribe({
      next : (data :TypePapier)=>{
        this.typePapierSelected = data ;
        this.facturation();

        console.log(data);

      },
      error : ()=>{
        console.log('Type papier by id : failed');
      }
    })
  }


  grammageSelected :Grammage = new Grammage();

  getGrammageById(idGrammage :any){
    this.parametreService.getGrammageById(idGrammage.target.value).subscribe({
      next : (data :Grammage)=>{
        this.grammageSelected = data ;
        this.facturation();
        console.log(data);

      },
      error : ()=>{
        console.log('grammage by id : failed');
      }
    })
  }


  finitionSelected :Finition = new Finition();

  getFinitionById(idFinition :any){

    this.parametreService.getFinitionById(idFinition.target.value).subscribe({
    next : (data :Finition)=>{
      this.finitionSelected = data ;
      this.getAllFacturationFinitionByFinition(data.idFinition);
      this.facturation();
      console.log('finition Selected :');
      console.log(data);

    },
    error : ()=>{
      console.log('finition by id : failed');
    }
    })
  }

  formeSelected :Forme = new Forme();

  getFormeById(idForme :any){
    this.parametreService.getFormeById(idForme.target.value).subscribe({
      next : (data :Forme)=>{
        this.formeSelected = data ;
        this.facturation();
        console.log(data);

      },
      error : ()=>{
        console.log('Forme by id : failed');
      }
    });
  }

  couleurSelected :Couleur = new Couleur();

  getCouleurById(idCouleur :any){
      this.parametreService.getCouleurById(idCouleur.target.value).subscribe({
        next : (data :Couleur)=>{
          this.couleurSelected = data ;
          this.getAllFacturationCouleurByFinition(data.idCouleur);
          // this.prixParDefaut = this.couleurSelected.valeurMultiplication! ;
          this.facturation();
          console.log(data);

        },
        error : ()=>{
          console.log('Couleur by id : failed');
        }
      });
  }


  faceSelected :Faces = new Faces();

  getFaceById(idFace :any){
    this.parametreService.getFacesById(idFace.target.value).subscribe({
      next : (data :Faces)=>{
        this.faceSelected = data ;
        this.facturation();
        console.log(data);

      },
      error : ()=>{
        console.log('Face by id : failed');
      }
    });
  }


  listForme : Forme[] = [] ;
  getAllFormeByService(idService :any){
    this.parametreService.getAllFormeByService(idService).subscribe({
      next : (data:Forme[])=>{
        this.listForme = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Forme');
      }
    });
  }

  listFinition : Finition[] = [];
  getAllFinitionByService(idService :any){
    this.parametreService.getAllFinitionByService(idService).subscribe({
      next : (data:Finition[])=>{
        this.listFinition = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Finition');
      }
    });
  }

  listGrammage : Grammage[] = [];
  getAllGrammageByService(idService :any){
    this.parametreService.getAllGrammageByService(idService).subscribe({
      next : (data:Grammage[])=>{
        this.listGrammage = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Grammage');
      }
    });
  }

  listTypePapier : TypePapier[] = [];
  getAllTypePapierByService(idService :any){
    this.parametreService.getAllTypePapierByService(idService).subscribe({
      next : (data:TypePapier[])=>{
        this.listTypePapier = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all TypePapier');
      }
    });
  }

  listFace : Faces[] = [];
  getAllFaceByService(idService :any){
    this.parametreService.getAllFacesByService(idService).subscribe({
      next : (data:Faces[])=>{
        this.listFace = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Face');
      }
    });
  }

  listCouleur : Couleur[] = [];
  getAllCouleurByService(idService :any){
    this.parametreService.getAllCouleurByService(idService).subscribe({
      next : (data:Couleur[])=>{
        this.listCouleur = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Couleur');
      }
    });
  }

  prixParDefaut :number = 0 ;
  qteParDefaut :number = 0;
  impressionObjetParDefaut : Impression = new Impression();
  getPrixParDefaut(){
      for (let j = 0; j < this.listImpression.length; j++) {
        this.impressionObjetParDefaut = this.listImpression[0];

        this.prixParDefaut = this.listImpression[0].montant; ///le prix par defaut est calqué sur le premier prix crée
        this.qteParDefaut = (this.listImpression[0].borneSuperieure ) ;
        console.log(this.listImpression[0]);
      }
  }

  prixFactureImpression : number =0.0 ;

  quantiteCommande:number = 0;
  getQuantiteCommande(e:any){
    this.quantiteCommande = e.target.value;
    this.facturation();
  }

  getPriceConception(){

      //prix conception
    if (this.commandeFb.value.Conception==null) {
       for (let i = 0; i < this.listConception.length; i++) {
          this.prixConception = this.listConception[0].montant;
        }
    }else{
      this.prixConception = this.conceptionForService.montant;

    }
    this.prixTotal =0 ;
    this.facturation();
  }
  prixTotal = 0 ;
  nbreExemplaire : number = 0 ;
  getExemplaire(e:any){
    this.nbreExemplaire = e.target.value;
    alert( this.nbreExemplaire);
  }

  listFacturationFinition : FacturationFinition[] = [];
  getAllFacturationFinitionByFinition(idFinition:any){
    this.parametreService.getFacturationFinitionByIdFinition(idFinition).subscribe({
      next: (data)=>{
          this.listFacturationFinition = data;
      },
      error: ()=>{
        console.log('Create facturation finition');
      }
    })
  }

  listFacturationCouleur : FacturationCouleur[] = [];
  getAllFacturationCouleurByFinition(idCouleur:any){
  this.parametreService.getFacturationCouleurById(idCouleur).subscribe({
    next: (data)=>{
        this.listFacturationCouleur = data;
        console.log(data);
    },
    error: ()=>{
      console.log('Create facturation finition');
    }
  })
  }


  facturation(){
    this.quantiteCommande = this.commandeFb.value.quantite;
    console.log("quantite commande : "+this.quantiteCommande);


      //Fecth montant impression correspondant à la quantite saisie
      let prixUnitaireCorrespondantQuantite= 0;
      for (let i = 0; i < this.listImpression.length; i++) {
         // alert('test du montant d  impresssion dans  l intervale');

        if  (this.listImpression[i].borneInferieure <= this.quantiteCommande  && this.quantiteCommande < this.listImpression[i].borneSuperieure  ) {
          prixUnitaireCorrespondantQuantite = this.listImpression[i].montant;
          // alert(prixUnitaireImpression);
          console.log('dans l intervale');
        };

      }



    // Facture Non Forfait


    //Recherche du prix de la finition correspondant à une quantité particulière
    //CA MARCHE
    let valeurAjoutFinition : number = 0 ;
    let valeurMultiplicationFinition : number = 1 ;
    if (this.quantiteCommande==null || this.quantiteCommande==0) {
      valeurAjoutFinition = 0 ;
      valeurMultiplicationFinition = 1;
    }else{
      // for (let k = 0; k < this.listFinition.length; k++) {
        //On parcourt la liste des finitions
        //Puis on cherche la liste des facturations de chaque finition. Dans cette liste on recherche si la quantite commandé se retrouve dans un interval


         for (let j = 0; j < this.listFacturationFinition.length; j++) {

            if (this.listFacturationFinition[j].borneInferieure! <= this.quantiteCommande && this.quantiteCommande < this.listFacturationFinition[j].borneSuperieure! ) {
              //si la quantite commandé se retrouve dans les intervalle sde la finition
              if (this.listFacturationFinition[j].valeurAjout!=null && this.listFacturationFinition[j].valeurMultiplication==null) {
                //Si la valeur d'addition est non nulle et al valeur de multipliccation nulle
                valeurAjoutFinition = this.listFacturationFinition[j].valeurAjout! ;

                //alert('valeur de valeurAjoutFinition'+valeurAjoutFinition)

              }else if (this.listFacturationFinition[j].valeurMultiplication!=null && this.listFacturationFinition[j].valeurAjout==null) {

                valeurMultiplicationFinition = this.listFacturationFinition[j].valeurAjout! ;
                //alert('valeur de valeurMultiplication'+valeurMultiplicationFinition)


              }

              console.log(`La quantite commandé est dans un intervale facturation ${this.listFacturationFinition[j].borneInferieure} et  ${this.listFacturationFinition[j].borneSuperieure}`)
            }

        }

      // }
    }

    console.log("Valaur ajout finition en fonction quantite :" +valeurAjoutFinition);
    console.log("Valaur multiplication finition en fonction quantite :" + valeurMultiplicationFinition);

    //CA MARCHE






    // let prixTotalImpression = 0.0;
    // // Ici on utilise la règle de 3 pour déterminer le prix d'une quantité particulière connaissant le prix initial
    // if (this.listCouleur.length==0) {
    //   //Si le service n'a pas de couleur
    //   if(this.quantiteCommande==null || this.quantiteCommande==0 || this.quantiteCommande == undefined){
    //     prixTotalImpression = this.prixParDefaut ;
    //    // alert('prix total sans quantite commande : '+prixTotalImpression);

    //   }else{
    //     // impressionObjetParDefaut : prix par defaut
    //      let quantite = this.impressionObjetParDefaut.borneSuperieure;
    //     // alert('quantite :' + quantite);

    //     if(quantite==undefined){
    //       alert('indefini')
    //     }else{

    //       prixTotalImpression = (this.prixParDefaut * this.quantiteCommande  ) / quantite ;
    //      // alert('prix total commande : '+prixTotalImpression);

    //     }
    //   }
    // }else{
    //   console.log('le service possède deS couleur');

    //   if (valeurMultiplicationCouleur !=null) {

    //     //prixTotalImpression = valeurMultiplicationCouleur  * this.quantiteCommande;
    //     prixTotalImpression = this.prixParDefaut  * this.quantiteCommande;

    //   }
    //   // }else{
    //   //  prixTotalImpression = prixUnitaireImpression * this.quantiteCommande;

    //   // }
    // }

    // console.log('prix intial :'+prixTotalImpression);
    // //on multiplie les valeur à multiplier si elle existe
    // //on additionne les valeurs à additionner si elle existe






       // Facture forfait

    if (this.serviceSelected.forfait) {
      // si le service est un service forfaire  ( exple : carte de visite )
      let prixForfaitCorrespondantWithQuantite = prixUnitaireCorrespondantQuantite; // C'est le prix forfaitaire correspondant à la quantite

      this.prixFactureImpression = (
      prixForfaitCorrespondantWithQuantite
      * (this.modeImpressionSelected.valeurMultiplication ?? 1)
      * (this.formatSelected.valeurMultiplication ?? 1)
      * (this.dimensionSelected.valeurMultiplication ?? 1)
      * (this.typePapierSelected.valeurMultiplication ?? 1)
      * (this.grammageSelected.valeurMultiplication ?? 1)
      * (valeurMultiplicationFinition)//valeur calculé après recheche de la fiinition correspondat à la qté
      * (this.formeSelected.valeurMultiplication ?? 1)
      * (this.faceSelected.valeurMultiplication ?? 1)
      )
        +
      (
      (this.modeImpressionSelected.valeurAjout ?? 0)
      + (this.formatSelected.valeurAjout ?? 0)
      + (this.dimensionSelected.valeurAjout ?? 0)
      + (this.typePapierSelected.valeurAjout ?? 0)
      + (this.faceSelected.valeurAjout ?? 0)
      + (this.grammageSelected.valeurAjout ?? 0)
      + (valeurAjoutFinition) //valeur calculé après recheche de la fiinition correspondat à la qté
      //+ (this.couleurSelected.valeurAjout ??0)
      + (this.formeSelected.valeurAjout ?? 0)

      );



    }else{
      // si le service n'est pas un service forfaire ( exple : documents )

      //Recherche du prix de la couleur correspondant à une quantité particulière

      let valeurAjoutCouleur : number = 0 ;
      let prixCorrespondantCouleurAndQuantite : number = this.prixParDefaut ;

     for (let j = 0; j < this.listFacturationCouleur.length; j++) {

            if (this.listFacturationCouleur[j].borneInferieure! <= this.quantiteCommande && this.quantiteCommande < this.listFacturationCouleur[j].borneSuperieure! ) {

              //si la quantite commandé se retrouve dans les intervalle sde la Couleur

              if (this.listFacturationCouleur[j].valeurAjout!=null && this.listFacturationCouleur[j].valeurMultiplication==null) {

                //Si la valeur d'addition est non nulle et al valeur de multipliccation nulle
                valeurAjoutCouleur = this.listFacturationCouleur[j].valeurAjout! ;
                //alert('valeur ajout couleur'+valeurAjoutCouleur);

              }else if (this.listFacturationCouleur[j].valeurMultiplication!=null && this.listFacturationCouleur[j].valeurAjout==null) {

                prixCorrespondantCouleurAndQuantite = this.listFacturationCouleur[j].valeurMultiplication! ;
                //alert('valeur multplication couleur'+prixCorrespondantCouleurAndQuantite);

              }

              //console.log(`La quantite commandé est dans un intervale ${this.listFacturationCouleur[j].borneInferieure} et  ${this.listFacturationCouleur[j].borneSuperieure}`)
            }

          }

      let prixImpressionWithQuantite = 0 ; // C'est le prix unitaire correspondant à la couleur et la  quantité x quantité commandé

      prixImpressionWithQuantite = (prixCorrespondantCouleurAndQuantite + (this.faceSelected.valeurMultiplication ?? 0)) * this.quantiteCommande ;


      this.prixFactureImpression = (
      prixImpressionWithQuantite
      * (this.modeImpressionSelected.valeurMultiplication ?? 1)
      * (this.formatSelected.valeurMultiplication ?? 1)
      * (this.dimensionSelected.valeurMultiplication ?? 1)
      * (this.typePapierSelected.valeurMultiplication ?? 1)
      * (this.grammageSelected.valeurMultiplication ?? 1)
      * (valeurMultiplicationFinition)//valeur calculé après recheche de la fiinition correspondat à la qté
      * (this.formeSelected.valeurMultiplication ?? 1)
      )
        +
      (
      (this.modeImpressionSelected.valeurAjout ?? 0)
      + (this.formatSelected.valeurAjout ?? 0)
      + (this.dimensionSelected.valeurAjout ?? 0)
      + (this.typePapierSelected.valeurAjout ?? 0)
      + (this.grammageSelected.valeurAjout ?? 0)
      + (valeurAjoutFinition) //valeur calculé après recheche de la fiinition correspondat à la qté
      //+ (this.couleurSelected.valeurAjout ??0)
      + (this.formeSelected.valeurAjout ?? 0)

      );


    }


    console.log('Prix facturation avec caractéristiques :'+this.prixFactureImpression);
    console.log('prix conception  :'+this.prixConception);

    if (this.nbreExemplaire!=0) {
      this.prixTotal = ((this.prixFactureImpression)+this.prixConception )*this.nbreExemplaire;
    }else{
      this.prixTotal = ((this.prixFactureImpression)+this.prixConception );

    }


    console.log(`montant  multiplication  mode impression: ${this.modeImpressionSelected.valeurMultiplication}`);
    console.log(`montant multiplication format  impression : ${this.formatSelected.valeurMultiplication}`);
    console.log(`montant multiplication dimensionSelected  impression : ${this.dimensionSelected.valeurMultiplication}`);
    console.log(`montant multiplication typePapierSelected  impression : ${this.typePapierSelected.valeurMultiplication}`);
    console.log(`montant multiplication valeurMultiplicationFinition  impression : ${valeurMultiplicationFinition}`);
    console.log(`montant multiplication formeSelected  impression : ${this.formeSelected.valeurMultiplication}`);
    console.log(`montant multiplication faceSelected  : ${this.faceSelected.valeurMultiplication}`);


    console.log(`montant addition  : ${this.modeImpressionSelected.valeurAjout}`);
    console.log(`montant addition format  impression : ${this.formatSelected.valeurAjout}`);
    console.log(`montant addition dimensionSelected  impression : ${this.dimensionSelected.valeurAjout}`);
    console.log(`montant addition typePapierSelected  impression : ${this.typePapierSelected.valeurAjout}`);
    console.log(`montant addition valeurAjoutFinition  impression : ${valeurAjoutFinition}`);
    console.log(`montant addition formeSelected  impression : ${this.formeSelected.valeurAjout}`);
    console.log(`montant addition faceSelected  : ${this.faceSelected.valeurAjout}`);
    console.log(`montant addition grammage  : ${this.grammageSelected.valeurAjout}`);
  }



}
