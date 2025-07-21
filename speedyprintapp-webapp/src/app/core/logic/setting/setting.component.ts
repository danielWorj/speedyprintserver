import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParametreService } from '../../API/Services/parametre/parametre.service';
import { Service } from '../../Model/Parametre/Service';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import e from 'express';
import { error } from 'console';
import { ModeImpression } from '../../Model/Parametre/ModeImpression';
import { Format } from '../../Model/Parametre/Format';
import { Dimension } from '../../Model/Parametre/Dimension';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
  serviceFb! : FormGroup;
  modeImpressionFb! : FormGroup;
  formatFb! : FormGroup;
  dimensionFb! : FormGroup;

  isService : boolean = false;
  isModeImpression : boolean = false;
  isFormat : boolean = false;
  isDimension : boolean = false;

  constructor(private fb : FormBuilder, private parametreService : ParametreService ){
      this.serviceFb = this.fb.group({
        idServices : new FormControl(),
        intitule : new FormControl(),
        description : new FormControl(),
        image : new FormControl(),
        prixConception : new FormControl(),
        prixImpression : new FormControl()
      });

      this.modeImpressionFb = this.fb.group({
        idModeImpression : new FormControl(),
        intitule : new FormControl(),
        description : new FormControl(),
        service : new FormControl(),
      });

      this.formatFb = this.fb.group({
        idFormat : new FormControl(),
        intitule : new FormControl(),
        service : new FormControl(),
      });

      this.dimensionFb = this.fb.group({
        idDimension : new FormControl(),
        intitule : new FormControl(),
        taille : new FormControl(),
        service : new FormControl()
      });
  }
  ngOnInit(): void {
    this.getAllService();
    this.getAllModeImpression();
    this.getAllDimension();
    this.getAllFormat();
  }

  listService : Service[] = [];
  getAllService(){
    this.parametreService.getAllService().subscribe({
      next : (data:Service[])=>{
        this.listService = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all service');
      }
    });
  }

  idServiceSelected:number = 0 ;
  selectService(s:Service){
    this.idServiceSelected = s.idServices!;
  }

  seeFichier : boolean = false;
  fichierToSend!:File;
  fichierUrl:string='';

  onSelectImage(e :any){
    this.seeFichier = true;
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{

        this.fichierUrl = event.target.result ;

        this.fichierToSend = e.target.files[0];

        console.log(this.fichierToSend.name);
    }

   }
  }

  createService(){



    const formData : FormData = new FormData;


    formData.append("file", this.fichierToSend);
    formData.append("service", JSON.stringify(this.serviceFb.value));

    this.parametreService.createService(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log('service crée');
          this.serviceFb.reset();
          this.getAllService();
          this.isService = true;
        }
      },
      error: ()=>{
        console.log('Erreur de création de service');
      }
    });
  }

  deleteService(){
    this.parametreService.deleteService(this.idServiceSelected).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message)
        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }

  //Mode Impression

  listModeImpression : ModeImpression[] = [];
  getAllModeImpression(){
    this.parametreService.getAllModeImpression().subscribe({
      next : (data:ModeImpression[])=>{
        this.listModeImpression = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all mode Impression');
      }
    });
  }

  getAllModeImpressionByService(idService :any){
    this.parametreService.getAllModeImpressionByService(idService).subscribe({
      next : (data:ModeImpression[])=>{
        this.listModeImpression = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all mode Impression');
      }
    });
  }

  idModeImpressionSelected:number = 0 ;
  selectModeImpression(m:ModeImpression){
    this.idModeImpressionSelected = m.idModeImpression!;
  }
  createModeImpression(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
    this.modeImpressionFb.controls['service'].setValue(this.idServiceSelected);
    }else{
      alert('Veillez choisir le service');
    }

    formData.append("mi", JSON.stringify(this.modeImpressionFb.value));

    this.parametreService.createMModeImpression(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.serviceFb.reset();
          this.getAllModeImpression();
          this.isModeImpression = true;
        }
      },
      error: ()=>{
        console.log('Erreur de création de mode impression');
      }
    });
  }

  deleteModeImpression(){
    this.parametreService.deleteImpression(this.idModeImpressionSelected).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message)
        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }


  //Format


  listFormat : Format[] = [];
  getAllFormat(){
    this.parametreService.getAllFormat().subscribe({
      next : (data:Format[])=>{
        this.listFormat = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all format');
      }
    });
  }

  getAllModeFormatByService(idService :any){
    this.parametreService.getAllFormatByService(idService).subscribe({
      next : (data:Format[])=>{
        this.listFormat = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all format');
      }
    });
  }

  idFormatSelected:number = 0 ;
  selectFormat(f:Format){
    this.idFormatSelected = f.idFormat!;
  }
  createFormat(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.formatFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }

    formData.append("mi", JSON.stringify(this.formatFb.value));

    this.parametreService.createFormat(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.serviceFb.reset();
          this.getAllFormat();
          this.isFormat = true;
        }
      },
      error: ()=>{
        console.log('Erreur de création de format');
      }
    });
  }

  deleteFormat(){
    this.parametreService.deleteFormat(this.idFormatSelected).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message)
        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }

  //Format


  listDimension : Dimension[] = [];
  getAllDimension(){
    this.parametreService.getAllDimension().subscribe({
      next : (data:Dimension[])=>{
        this.listDimension = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all dimensi');
      }
    });
  }

  getAllDimensionByService(idService :any){
    this.parametreService.getAllDimensionByService(idService).subscribe({
      next : (data:Dimension[])=>{
        this.listDimension = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all dimension');
      }
    });
  }

  idDimensionSelected:number = 0 ;
  selectDimension(d:Dimension){
    this.idDimensionSelected = d.idDimension!;
  }
  createDimension(){
    const formData : FormData = new FormData;


    if (this.idServiceSelected!=0) {
      this.dimensionFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("mi", JSON.stringify(this.dimensionFb.value));

    this.parametreService.createDimension(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.serviceFb.reset();
          this.getAllDimension();
          this.isDimension = false;
        }
      },
      error: ()=>{
        console.log('Erreur de création de dimension');
      }
    });
  }

  deleteDimension(){
    this.parametreService.deleteDimension(this.idFormatSelected).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message)
        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }

  sendToCreationService(){
    this.isModeImpression = false;
    this.isFormat = false;
    this.isDimension = false;

    this.isService = true;
  }

  sendToCreationModeImpression(){

    this.isService = false;
    this.isFormat = false;
    this.isDimension = false;

    this.isModeImpression = true;
  }

  sendToCreationFormat(){
    this.isService = false;
    this.isModeImpression = false;
    this.isDimension = false;

    this.isFormat = true;
  }

  sendToCreationDimension(){
    this.isFormat = false;
    this.isModeImpression = false;
    this.isDimension = false;

    this.isDimension = true;
  }
}
