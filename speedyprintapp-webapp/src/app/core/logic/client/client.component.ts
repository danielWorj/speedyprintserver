import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../API/Services/Client/client.service';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import { Client } from '../../Model/Client/Client';
import { AbonnementService } from '../../API/Services/Abonnement/abonnement.service';
import { Abonnement } from '../../Model/Abonnement/Abonnement';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clientFb !: FormGroup;
  constructor(private fb : FormBuilder, private clientService : ClientService , private abonnementService : AbonnementService){

    this.clientFb = this.fb.group({
      idUser : new FormControl(),
      nomUtilisateur : new FormControl(),
      password : new FormControl(),
      contact : new FormControl(),
      email : new FormControl(),
      bankCard : new FormControl(),
      origin : new FormControl(),
    });
  }

  ngOnInit(): void {
      this.getAllClient();
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

  idSelectedClient : number = 0;
  selectClient(c:Client){
    this.clientFb.controls['idUser'].setValue(c.idUser);
    this.clientFb.controls['nom'].setValue(c.nomUtilisateur);
    this.clientFb.controls['contact'].setValue(c.contact);
    this.clientFb.controls['email'].setValue(c.email);
  }

  isCreation : boolean = false ;

  sendToCreation(){
    this.isCreation = true;
    this.isViewAbonnement = false ;
  }

  sendToUpdate(){
    this.isCreation = false ;
  }

  closeModal(){
    this.isCreation = false ;
  }

  submitClient(){
    if (this.isCreation) {
      const formData : FormData = new FormData;
      formData.append("client", JSON.stringify(this.clientFb.value));

      this.clientService.createClient(formData).subscribe({
        next : (data : ServerResponse)=>{
          if (data.success) {
            console.log(data.message);
            this.getAllClient();
            this.clientFb.reset();
          }
        },
        error : ()=>{
          console.log('Erreur creation client');
        }
      });
    }else if(!this.isCreation){

      const formData : FormData = new FormData;
      formData.append("client", JSON.stringify(this.clientFb.value));

      this.clientService.udpateClient(formData).subscribe({
        next : (data : ServerResponse)=>{
          if (data.success) {
            console.log(data.message);
            this.getAllClient();
            this.clientFb.reset();
          }
        },
        error : ()=>{
          console.log('Erreur mise à jour client');
        }
      });
    }
  }

  deleteClient(){
    this.clientService.deleteClient(this.idSelectedClient).subscribe({
      next : (data:ServerResponse)=>{
        console.log(data.message);
      },
      error : ()=>{
        console.log("client delete");
      }
    })
  }

  isViewAbonnement : boolean = false;

  sendToView(idClient:any){
    this.isViewAbonnement = true;
    this.isCreation = false;
    this.getAllAbonnementByClient(idClient);
  }

  listAbonnementByClient : Abonnement[] = [];
  getAllAbonnementByClient(idClient :any){
    this.abonnementService.getAllByClient(idClient).subscribe({
      next : (data:Abonnement[])=>{
        this.listAbonnementByClient = data;
      },
      error: ()=>{
        console.log('All abonnement by client :any');
      }
    });
  }




}
