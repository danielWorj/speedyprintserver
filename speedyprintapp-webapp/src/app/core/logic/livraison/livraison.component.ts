import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables  } from 'chart.js';
import { CommandeService } from '../../API/Services/Commande/commande.service';
import { Livraison } from '../../Model/Commande/Livraison';
import { LivraisonService } from '../../API/Services/Livraison/livraison.service';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import { Commande } from '../../Model/Commande/Commande';
Chart.register(...registerables);
@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './livraison.component.html',
  styleUrl: './livraison.component.css'
})
export class LivraisonComponent implements OnInit{

  livraisonFb !:FormGroup;

  constructor(private fb : FormBuilder, private livraisonService : LivraisonService , private commmandeService : CommandeService){

    this.livraisonFb = this.fb.group({
      idLivraison : new FormControl(),
      destination : new FormControl(),
      commande : new FormControl(),
      localDate : new FormControl(),
      etat : new FormControl()
    });

  }

  ngOnInit(): void {
   this.refreshPage();
  }

  refreshPage(){
    this.getAllCommande();

    this.getAllLivraison();
    this.getCountLivraison();

    this.getAllMonthWeHave();
    this.getAllQteByMonth();


    this.getQteServiceList();
    this.getServiceList();

  }

  openChart(){

    this.graphLivraisonParQte();
    this.graphLivraisonParMois();

  }

  listLivraison : Livraison[] = [];
  getAllLivraison(){
    this.livraisonService.getAllLivraison().subscribe({
      next : (data:Livraison[])=>{
        this.listLivraison = data.reverse();
      },
      error: ()=>{
        console.log('Livraison fectch : failed');
      }
    });
  }

  createLivraison(){
    const formData : FormData = new FormData;

    console.log(this.livraisonFb.value);
    formData.append("livraison", JSON.stringify(this.livraisonFb.value));

    this.livraisonService.createLivraison(formData).subscribe({
      next : (data:ServerResponse)=>{
          if (data.success) {
            this.ngOnInit();

            console.log(data.message);

            this.livraisonFb.reset();
          }
      } ,
      error : ()=>{
        console.log('Create livraison');
      }
    });
  }

  idSelectedLivraison :number = 0;
  selectLivraison(l:Livraison){

    this.idSelectedLivraison = l.idLivraison!;

    this.livraisonFb.controls['idLivraison'].setValue(l.idLivraison);
    this.livraisonFb.controls['destination'].setValue(l.destination);
    this.livraisonFb.controls['commande'].setValue(l.commande.idCommande);
    this.livraisonFb.controls['etat'].setValue(l.etat);
  }

  deleteLivraison(){
    this.livraisonService.deleteLivraison(this.idSelectedLivraison).subscribe({
      next : (data : ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.refreshPage();

        }
      },
      error : ()=>{
        console.log('Delete Livraison : fetch');
      }
    });
  }

  listServiceString : string[] = [];

  getServiceList(){
    this.livraisonService.getAllServiceLivraison().subscribe({
      next : (data:string[])=>{
        for (let i = 0; i < data.length; i++) {
          this.listServiceString.push(data[i]);
        }
      },
      error : ()=>{
        console.log('List service string; ')
      }
    });
  }

  countLivraison : number = 0;
  getCountLivraison(){
    this.livraisonService.countLivraison().subscribe({
      next:(data:number)=>{
        this.countLivraison = data;
      }
    })
  }
  qteService : number[] = [];

  getQteServiceList(){
    this.livraisonService.getAllQteLivraisonByMonth().subscribe({
      next : (data:number[])=>{
        for (let i = 0; i < data.length; i++) {
          this.qteService.push(data[i]);
        }
        console.log(this.qteService);
      },
      error : ()=>{
        console.log('List qte number; ')
      }
    });
  }

  listCommande : Commande[] = [];

  getAllCommande(){
    this.commmandeService.getAllCommande().subscribe({
      next : (data :Commande[])=>{
        this.listCommande = data;
      },
      error : ()=>{
        console.log('Fetch commande');
      }
    })
  }


  graphLivraisonParQte(){


    let ctx= document.getElementById('chartLivraisonQte');

    new Chart(ctx as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: this.listServiceString,

        datasets: [{
          data: this.qteService,
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

  listMonth : string[] = [];

  getAllMonthWeHave(){
    this.livraisonService.getAllMonthLivraison().subscribe({
      next : (data:string[])=>{
        for (let i = 0; i < data.length; i++) {
         this.listMonth.push(data[i]);
        }

        console.log(this.listMonth);
      },
      error : ()=>{
        console.log('');
      }
    });
  }

  listQteByMonth : number[] = [];

  getAllQteByMonth(){
    this.livraisonService.getAllQteLivraisonByMonth().subscribe({
      next : (data : number[])=>{
        for (let j = 0; j < data.length; j++) {
          this.listQteByMonth.push(data[j]);
        }

        console.log(this.listQteByMonth);

      }
    })
  }

  graphLivraisonParMois(){



    let ctx= document.getElementById('chartLivraisonMois');
    new Chart(ctx as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels:this.listMonth ,
        datasets: [{
          data:this.listQteByMonth,
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

}
