import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbonnementService } from '../../API/Services/Abonnement/abonnement.service';
import { Offre } from '../../Model/Abonnement/Offre';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import { DetailsOffre } from '../../Model/Abonnement/DetailsOffre';
import { ClientService } from '../../API/Services/Client/client.service';
import { Client } from '../../Model/Client/Client';
import { Abonnement } from '../../Model/Abonnement/Abonnement';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-abonnement',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './abonnement.component.html',
  styleUrl: './abonnement.component.css'
})
export class AbonnementComponent implements OnInit{

   offreGroup !: FormGroup;
   detailsOffreGroup !:FormGroup;
   abonnementFb !:FormGroup;
  constructor(private fb : FormBuilder, private abonnementService :AbonnementService , private clientService : ClientService){
    this.offreGroup = this.fb.group({
      idOffre : new FormControl(),
      intitule : new FormControl(),
      montant : new FormControl(),
      remise : new FormControl()
    });

    this.detailsOffreGroup = this.fb.group({
      idDetailOffre : new FormControl(),
      intitule : new FormControl(),
      offre : new FormControl()
    });

    this.abonnementFb = this.fb.group({
      idAbonnement : new FormControl(),
      client : new FormControl(),
      offre : new FormControl(),
      date : new FormControl(),
      dateFin : new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getAllOffre();
    this.getAllClient();
    this.getAllAbonnement();
  }

  listOffre : Offre[] = [];
  getAllOffre(){
    this.abonnementService.getAllOffre().subscribe({
      next : (data:Offre[])=>{
          this.listOffre =data;
      },
      error : ()=>{
        console.log('list offre : failed');
      }
    });
  }

  idOffreSelected : number =0;
  selectOffre(o:Offre){

    this.idOffreSelected = o.idOffre;

    this.offreGroup.controls['idOffre'].setValue(o.idOffre);
    this.offreGroup.controls['intitule'].setValue(o.intitule);
    this.offreGroup.controls['montant'].setValue(o.montant);
    this.offreGroup.controls['remise'].setValue(o.remise);

  }

  isCreationOffre : boolean = false;
  isOffreCreate : boolean = false;
  offreCreated : Offre = new Offre ;

  sendToCreation(){
    this.isAbonnement = false;
    this.isOffre = true;
    this.isCreationOffre =true;
  }
  createOffre(){
    if (this.isCreationOffre) {
      const formData : FormData = new FormData;
      formData.append("offre",JSON.stringify( this.offreGroup.value));
      this.abonnementService.createOffre(formData).subscribe({
        next : (data:Offre)=>{
          this.offreCreated = data;
          this.offreGroup.reset();
          this.isCreationOffre = false;
          this.getAllOffre();
        }
      });
    }else{
      const formData : FormData = new FormData;
      formData.append("offre",JSON.stringify( this.offreGroup.value));
      this.abonnementService.updateOffre(formData).subscribe({
        next : (data:ServerResponse)=>{
          if (data.success) {
            alert(`${data.message}`);
          }
        }
      });
    }
  }

  deleteOffre(idOffre:any){
    this.abonnementService.deleteOffre(idOffre).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          alert(data.message);
        }
      }
    })
  }

  closeModal(){
    this.isCreationOffre = false;
    this.isOffreCreate = false;
    this.offreGroup.reset();
    this.detailsOffreGroup.reset();
    this.idOffreSelected =0;
    this.listDetails = [];
  }
  listDetails : DetailsOffre[] = [];
  getAllDetailsOffre(idOffre:any){
    this.isOffreCreate = true ;
    this.abonnementService.getAllDetailOffre(idOffre).subscribe({
      next: (data:DetailsOffre[])=>{
        this.listDetails = data;

      }
    });
  }

  isCreationDetailsOffre : boolean = false;

  selectDetailsOffre(d:DetailsOffre){
    this.detailsOffreGroup.controls['idDetailOffre'].setValue(d.idDetailOffre);
    this.detailsOffreGroup.controls['intitule'].setValue(d.intitule);
    this.detailsOffreGroup.controls['offre'].setValue(d.offre.idOffre);
  }


  createDetailsOffre(){

    const formData : FormData = new FormData;
    if (Object.keys(this.offreCreated).length === 0) {

      console.log(this.idOffreSelected);
      this.detailsOffreGroup.controls['offre'].setValue(this.idOffreSelected);
    }else{
      this.detailsOffreGroup.controls['offre'].setValue(this.offreCreated.idOffre);
    }
    console.log(this.detailsOffreGroup.value);
    formData.append("details", JSON.stringify(this.detailsOffreGroup.value));
    this.abonnementService.createDetailsOffre(formData).subscribe({
      next:(data:ServerResponse)=>{
        if (data.success) {
          //alert(data.message);
          if (Object.keys(this.offreCreated).length === 0) {
            this.getAllDetailsOffre(this.idOffreSelected);

          }else{
            this.getAllDetailsOffre(this.offreCreated.idOffre);
          }
        }
      }
    });
  }

  updateDetailsOffre(){
    const formData : FormData = new FormData;
    formData.append("details", JSON.stringify(this.detailsOffreGroup.value));
    this.abonnementService.updateDetailsOffre(formData).subscribe({
      next:(data:ServerResponse)=>{
        if (data.success) {
          alert(data.message);
        }
      }
    });
  }

  deleteDetailOffre(idDetail:any){
    this.abonnementService.deleteDetailsOffre(idDetail).subscribe({
      next : (data:ServerResponse)=>{
        alert(data.message);
      }
    });
  }

  listClient : Client[] = [];
  getAllClient(){
    this.clientService.getAllClient().subscribe({
      next : (data:Client[])=>{
        this.listClient = data.reverse();
      },
      error : ()=>{
        console.log("client list fetch : failed");
      }
    });
  }

  isAbonnement: boolean = false ;
  isOffre : boolean = false;
  idClient :number = 0 ;

  goToAbonnement(){
    this.isAbonnement = true;
    this.isOffre = false ;
  }

  actualDate = Date.now();


  listAbonnement : Abonnement[] = [];
  getAllAbonnement(){
    this.abonnementService.getAllAbonnement().subscribe({
      next : (data:Abonnement[])=>{
        this.listAbonnement = data;
      },
      error: ()=>{
        console.log('List abonnement :failed');
      }
    })
  }

   getAllAbonnementByClient(c :any){
    let idClient = c.target.value;
    this.abonnementService.getAllByClient(idClient).subscribe({
      next : (data:Abonnement[])=>{
        this.listAbonnement = data;
      },
      error: ()=>{
        console.log('List abonnement by client :failed');
      }
    })
  }
  createAbonnement(){
    const formData : FormData = new FormData();

    console.log(this.abonnementFb.value);

    formData.append('abonnement', JSON.stringify(this.abonnementFb.value));

    this.abonnementService.createAbonnement(formData).subscribe({
      next: (data:ServerResponse)=>{
        if (data.success) {
          this.getAllAbonnement();
          this.abonnementFb.reset();
        }
      }
    })
  }
}
