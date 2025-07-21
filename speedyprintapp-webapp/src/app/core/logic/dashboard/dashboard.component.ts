import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables  } from 'chart.js';
import { ClientService } from '../../API/Services/Client/client.service';
import { CommandeService } from '../../API/Services/Commande/commande.service';
import { LivraisonService } from '../../API/Services/Livraison/livraison.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private clientService : ClientService, private commandeService : CommandeService, private livraisonService : LivraisonService){

  }
   ngOnInit(): void {
     this.graphCommande15DerniersJ();
     this.graphRepartitionClientParOrigine();
     this.graphRepartitionLivraisonParEtat();
     this.graphRepartitionTransactionByCompte();

     this.getCountCommande();
     this.getCountClient();
     this.getLivraisonCommande();
   }


   graphCommande15DerniersJ(){

      let ctx= document.getElementById('chartCommande15J');

      new Chart(ctx as HTMLCanvasElement, {
        type: 'bar',
        data: {
          labels: ['25-03-2025', '26-03-2025' , '27-03-2025' , '28-03-2025' , '29-03-2025' , '30-03-2025', '31-03-2025' , '01-04-2025' , '02-04-2025' , '03-04-2025'],

          datasets: [{
            data: [100, 80 , 65, 132, 10, 25, 13 , 29, 40 , 56],
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



    graphRepartitionClientParOrigine(){

      let ctx= document.getElementById('clientOrigine');

      new Chart(ctx as HTMLCanvasElement, {
        type: 'doughnut',
        data: {
          labels: [ 'on line' , 'Others'],

          datasets: [{
            data: [100, 25],
            backgroundColor: [
              'rgba(54, 162 , 235 , 0.5)',
              'rgba(255, 206 , 86 , 0.5)',
              'rgba(255, 99 , 132 , 0.5)',
              'rgba(75, 192 , 192 , 0.5)',
              'rgba(153, 102 , 255 , 0.5)',
              'rgba(255, 159 , 64 , 0.5)',
            ],
            borderWidth: 1,
          }],


        },

      });


    }

    graphRepartitionLivraisonParEtat(){

      let ctx= document.getElementById('livraisonEtat');

      new Chart(ctx as HTMLCanvasElement, {
        type: 'doughnut',
        data: {
          labels: [  'Terminé', 'Non Terminé'],

          datasets: [{
            data: [45, 25],
            backgroundColor: [
              'rgba(54, 162 , 235 , 0.5)',
              'rgba(255, 99 , 132 , 0.5)',
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

    graphRepartitionTransactionByCompte(){

      let ctx= document.getElementById('transactionCompte');

      new Chart(ctx as HTMLCanvasElement, {
        type: 'doughnut',
        data: {
          labels: [ 'OM' , 'Momo' , 'BANK'],

          datasets: [{
            data: [75000, 35000 , 60000],
            backgroundColor: [
              'rgba(255, 159 , 64 , 0.5)',
              'rgba(255, 206 , 86 , 0.5)',
              'rgba(54, 162 , 235 , 0.5)',
              'rgba(153, 102 , 255 , 0.5)',
              'rgba(255, 99 , 132 , 0.5)',
              'rgba(75, 192 , 192 , 0.5)',
              'rgba(153, 102 , 255 , 0.5)',
            ],
            borderWidth: 1,
          }],


        },

      });


    }


    countClient : number = 0 ;

    getCountClient(){
      this.clientService.countClient().subscribe({
        next : (data:number)=>{
          this.countClient = data;
        },
        error : ()=>{
          console.log('count client')
        }
      })
    }



    countCommande : number = 0 ;

    getCountCommande(){
      this.commandeService.getCountCommande().subscribe({
        next : (data:number)=>{
          this.countCommande = data;
        },
        error : ()=>{
          console.log('count commmande');
        }
      })
    }



    countLivraison : number = 0 ;

    getLivraisonCommande(){
      this.livraisonService.countLivraison().subscribe({
        next : (data:number)=>{
          this.countLivraison = data;
        },
        error : ()=>{
          console.log('count Livraison');
        }
      })
    }
}
