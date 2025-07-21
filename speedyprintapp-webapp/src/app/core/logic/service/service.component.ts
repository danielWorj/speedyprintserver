import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParametreService } from '../../API/Services/parametre/parametre.service';
import { ServerResponse } from '../../Model/Server/ServerResponse';
import { Service } from '../../Model/Parametre/Service';
import { Dimension } from '../../Model/Parametre/Dimension';
import { Format } from '../../Model/Parametre/Format';
import { ModeImpression } from '../../Model/Parametre/ModeImpression';
import { Conception } from '../../Model/Parametre/Conception';
import { Impression } from '../../Model/Parametre/Impression';
import { TypePapier } from '../../Model/Parametre/TypePapier';
import { Grammage } from '../../Model/Parametre/Grammage';
import { Finition } from '../../Model/Parametre/Finition';
import { Forme } from '../../Model/Parametre/Formes';
import { CategorieService } from '../../Model/Parametre/CategorieService';
import { Constante } from '../../API/Constant';
import { DatePipe } from '@angular/common';
import { Couleur } from '../../Model/Parametre/Couleur';
import { Face } from '../../Model/Commande/Face';
import { Faces } from '../../Model/Parametre/Faces';
import { FacturationFinition } from '../../Model/Parametre/FacturationFinition';
import { FacturationCouleur } from '../../Model/Parametre/FacturationCouleur';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  serviceFb !:FormGroup;
  modeImpressionFb! : FormGroup;
  formatFb! : FormGroup;
  dimensionFb! : FormGroup;
  conceptionFb !:FormGroup;
  impressionFb!:FormGroup;
  typePapierFb!:FormGroup;
  grammageFb!:FormGroup;
  couleurFb!:FormGroup;
  faceFb!:FormGroup;
  finitionFb!:FormGroup;
  formeFb!:FormGroup;
  categorieServiceFb !:FormGroup;
  facturationFinitionFb !:FormGroup;
  facturationCouleurFb !:FormGroup;

  constructor(private parametreService : ParametreService, private fb :FormBuilder ){

    this.serviceFb = this.fb.group({
      idServices : new FormControl(),
      intitule : new FormControl(),
      description : new FormControl(),
      image : new FormControl(),
      forfait : new FormControl(),
      categorieService : new FormControl(),
    });

     this.impressionFb = this.fb.group({
      idImpression : new FormControl(),
      remise : new FormControl(),
      montant : new FormControl(),
      borneInferieure : new FormControl(),
      borneSuperieure : new FormControl(),
      service : new FormControl(),
      modeImpression : new FormControl(),
      dimension : new FormControl(),
      format : new FormControl(),
      face : new FormControl(),
      typePapier : new FormControl(),
      grammage : new FormControl(),
      finition : new FormControl(),
      couleur : new FormControl(),
      forme : new FormControl(),
    });

    this.modeImpressionFb = this.fb.group({
      idModeImpression : new FormControl(),
      intitule : new FormControl(),
      description : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.formatFb = this.fb.group({
      idFormat : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.dimensionFb = this.fb.group({
      idDimension : new FormControl(),
      intitule : new FormControl(),
      taille : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.conceptionFb = this.fb.group({
      idConception : new FormControl(),
      typeConception : new FormControl(),
      montant : new FormControl(),
      service : new FormControl()
    });

    this.typePapierFb = this.fb.group({
      idTypePapier : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.grammageFb = this.fb.group({
      idGrammage : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.finitionFb = this.fb.group({
      idFinition : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
    });

    this.formeFb = this.fb.group({
      idForme : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.categorieServiceFb = this.fb.group({
      idCategorieService:new FormControl(),
      intitule : new FormControl(),
      image : new FormControl()
    });

     this.couleurFb = this.fb.group({
      idCouleur : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
    });

     this.faceFb = this.fb.group({
      idFace : new FormControl(),
      intitule : new FormControl(),
      service : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
    });

    this.facturationFinitionFb = this.fb.group({
      idFacturationFinition : new FormControl(),
      finition : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
      borneInferieure : new FormControl(),
      borneSuperieure : new FormControl(),
    });

    this.facturationCouleurFb = this.fb.group({
      idFacturationCouleur : new FormControl(),
      couleur : new FormControl(),
      valeurAjout : new FormControl(),
      valeurMultiplication : new FormControl(),
      borneInferieure : new FormControl(),
      borneSuperieure : new FormControl(),
    });
  }
  ngOnInit(): void {
    this.getAllService();
    this.getAllCategorieService();
  }


  seeImageService : boolean = false;
  imageServiceToSend!:File;
  fichierUrl:string='';

  onSelectImage(e :any){
    this.seeImageService = true;
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{

        this.fichierUrl = event.target.result ;

        this.imageServiceToSend = e.target.files[0];
    }

   }
  }

  listService : Service[] = [];
  getAllService(){
    this.parametreService.getAllService().subscribe({
      next : (data:Service[])=>{
        this.listService = data;
      },
      error : ()=>{
        console.log('Erreur fecth all service');
      }
    });
  }

  getAllServiceByCategorieService(event:any){
    let idCategorie = event.target.value;

    this.parametreService.getAllServiceByCategorie(idCategorie).subscribe({
      next : (data :Service[])=>{
        this.listService = data;
      },
      error : ()=>{
        console.log('List service by categorie : failed');
      }
    })
  }

  idServiceSelected:number = 0 ;
  selectService(s:Service){
    this.idServiceSelected = s.idServices!;
    this.serviceFb.controls['idServices'].setValue(s.idServices);
    this.serviceFb.controls['intitule'].setValue(s.intitule);
    this.serviceFb.controls['description'].setValue(s.description);
    this.serviceFb.controls['image'].setValue(s.image);
  }
  isCreationService : boolean = false;

  sendToCreation(){

    this.isCreateCategorieService = false;
    this.isParametrage = false;
    this.isCreationService = true;
  }

  isParametrage :boolean = false ;
  sendToParametrage(s:Service){

    this.idServiceSelected = s.idServices!;
    this.isCreationService = false;
    this.isCreateCategorieService = false;
    this.isParametrage = true;

    this.getAllFormatByService(s.idServices);
    this.getAllModeImpressionByService(s.idServices);
    this.getAllFinitionByService(s.idServices);
    this.getAllFormeByService(s.idServices);
    this.getAllGrammageByService(s.idServices);
    this.getAllConceptionByService(s.idServices);
    this.getAllDimensionByService(s.idServices);
    this.getAllTypePapierByService(s.idServices);
    this.getImpressionByService(s.idServices);
    this.getAllFaceByService(s.idServices);
    this.getAllCouleurByService(s.idServices);
  }
  createService(){

    const formData : FormData = new FormData;


    formData.append("file", this.imageServiceToSend);
    formData.append("service", JSON.stringify(this.serviceFb.value));

    this.parametreService.createService(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log('service crée');
          this.serviceFb.reset();
          this.isCreationService = false ;
          this.getAllService();

        }
      },
      error: ()=>{
        console.log('Erreur de création de service');
      }
    });

  }

  deleteService(idService :any){
    this.parametreService.deleteService(idService).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          this.ngOnInit();
          alert(data.message);
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
    this.modeImpressionFb.controls['idModeImpression'].setValue(m.idModeImpression);
    this.modeImpressionFb.controls['intitule'].setValue(m.intitule);
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
          this.modeImpressionFb.reset();
          this.getAllModeImpressionByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de mode impression');
      }
    });
  }

  deleteModeImpression(idModeImpression:any){
    this.parametreService.deleteModeImpression(idModeImpression).subscribe({
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

  getAllFormatByService(idService :any){
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
    this.formatFb.controls['idFormat'].setValue(f.idFormat);
    this.formatFb.controls['intitule'].setValue(f.intitule);
  }
  createFormat(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.formatFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }
    console.log(this.formatFb.value);
    formData.append("format", JSON.stringify(this.formatFb.value));

    this.parametreService.createFormat(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.formatFb.reset();
          this.getAllFormatByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de format');
      }
    });
  }

  deleteFormat(idFormat:any){
    this.parametreService.deleteFormat(idFormat).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.formatFb.reset();
          this.getAllFormatByService(this.idServiceSelected)
        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }

  //Dimension

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


    formData.append("dim", JSON.stringify(this.dimensionFb.value));

    this.parametreService.createDimension(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.dimensionFb.reset();
          this.getAllDimensionByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de dimension');
      }
    });
  }

  deleteDimension(idDimension :any){
    this.parametreService.deleteDimension(idDimension).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllDimensionByService(this.idServiceSelected);

        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }

  //Conception

  listConception : Conception[] = [];
  getAllConception(){
    this.parametreService.getAllConception().subscribe({
      next : (data:Conception[])=>{
        this.listConception = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all conception');
      }
    });
  }

  getAllConceptionByService(idService :any){
    this.parametreService.getAllConceptionByService(idService).subscribe({
      next : (data:Conception[])=>{
        this.listConception = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Conception');
      }
    });
  }

  idConceptionSelected:number = 0 ;
  selectConception(c:Conception){
    this.idConceptionSelected = c.idConception!;
  }
  createConception(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.conceptionFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("conception", JSON.stringify(this.conceptionFb.value));

    this.parametreService.createConception(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.conceptionFb.reset();
          this.getAllConceptionByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de conception');
      }
    });
  }

  deleteConception(idConception:any){
    this.parametreService.deleteConception(idConception).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message)
        }
      },
      error : ()=>{
        console.log('delete Error');
        this.getAllConceptionByService(this.idServiceSelected);

      }
    })
  }



  //Impression

  listImpression : Impression[] = [];
  getAllImpression(){
    this.parametreService.getAllImpression().subscribe({
      next : (data:Impression[])=>{
        this.listImpression = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Impression');
      }
    });
  }

  impressionForService : Impression = new Impression();
  getImpressionByService(idService :any){

    this.parametreService.getImpressionByService(idService).subscribe({
      next : (data:Impression[])=>{
        this.listImpression =data;
        console.log("list impression by id : "+ this.listImpression);
      },
      error : ()=>{
        console.log('Erreur fecth all Impression');
      }
    });
  }

  idImpressionSelected:number = 0 ;
  selectImpression(c:Impression){
    this.idImpressionSelected = c.idImpression!;
  }
  createImpression(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.impressionFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }

    console.log(this.impressionFb.value);
    formData.append("impression", JSON.stringify(this.impressionFb.value));

    this.parametreService.createImpression(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          this.getImpressionByService(this.idServiceSelected);
          console.log(data.message);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Impression');
      }
    });
  }

  deleteImpression(idImpression:any){
    this.parametreService.deleteImpression(idImpression).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getImpressionByService(this.idServiceSelected);

        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }


  //TypePapier

  listTypePapier : TypePapier[] = [];
  getAllTypePapier(){
    this.parametreService.getAllTypePapier().subscribe({
      next : (data:TypePapier[])=>{
        this.listTypePapier = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all TypePapier');
      }
    });
  }

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

  idTypePapierSelected:number = 0 ;
  selectTypePapier(c:TypePapier){
    this.idTypePapierSelected = c.idTypePapier!;
  }
  createTypePapier(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.typePapierFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("typepapier", JSON.stringify(this.typePapierFb.value));

    this.parametreService.createTypePapier(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.typePapierFb.reset();
          this.getAllTypePapierByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de TypePapier');
      }
    });
  }

  deleteTypePapier(idTypePapier:any){
    this.parametreService.deleteTypePapier(idTypePapier).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllTypePapierByService(this.idServiceSelected);

        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }




  //Grammage

  listGrammage : Grammage[] = [];
  getAllGrammage(){
    this.parametreService.getAllGrammage().subscribe({
      next : (data:Grammage[])=>{
        this.listGrammage = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Grammage');
      }
    });
  }

  getAllGrammageByService(idService :any){
    this.parametreService.getAllGrammageByService(idService).subscribe({
      next : (data:Grammage[])=>{
        this.listGrammage = data;
        console.log('list grammage');
        console.log(this.listGrammage);
      },
      error : ()=>{
        console.log('Erreur fecth all Grammage');
      }
    });
  }

  idGrammageSelected:number = 0 ;
  selectGrammage(c:Grammage){
    this.idGrammageSelected = c.idGrammage!;
  }
  createGrammage(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.grammageFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("grammage", JSON.stringify(this.grammageFb.value));
    console.log(this.grammageFb.value);

    this.parametreService.createGrammager(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.grammageFb.reset();
          this.getAllGrammageByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Grammage');
      }
    });
  }

  deleteGrammage(idGrammage:any){
    this.parametreService.deleteGrammage(idGrammage).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllGrammageByService(this.idServiceSelected);

        }
      },
      error : ()=>{
        console.log('delete Error');
      }
    })
  }




  //Finition

  listFinition : Finition[] = [];
  getAllFinition(){
    this.parametreService.getAllFinition().subscribe({
      next : (data:Finition[])=>{
        this.listFinition = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Finition');
      }
    });
  }

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

  idFinitionSelected:number = 0 ;
  selectFinition(c:Finition){
    this.idFinitionSelected = c.idFinition!;
  }
  createFinition(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.finitionFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("finition", JSON.stringify(this.finitionFb.value));

    this.parametreService.createFinition(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.finitionFb.reset();
          this.getAllFinitionByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Finition');
      }
    });
  }

  deleteFinition(idFinition:any){
    this.parametreService.deleteFinition(idFinition).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          this.getAllFinitionByService(this.idServiceSelected);
          console.log(data.message);
        }
      },
      error : ()=>{
        console.log('delete Error');
        this.getAllFinitionByService(this.idServiceSelected);

      }
    })
  }


  //Forme

  listForme : Forme[] = [];
  getAllForme(){
    this.parametreService.getAllForme().subscribe({
      next : (data:Forme[])=>{
        this.listForme = data.reverse();
      },
      error : ()=>{
        console.log('Erreur fecth all Forme');
      }
    });
  }

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

  idFormeSelected:number = 0 ;
  selectForme(c:Forme){
    this.idFormeSelected = c.idForme!;
  }
  createForme(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.formeFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("forme", JSON.stringify(this.formeFb.value));

    this.parametreService.createForme(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.formeFb.reset();
          this.getAllFormeByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Forme');
      }
    });
  }

  deleteForme(idForme:any){
    this.parametreService.deleteForme(idForme).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllFormeByService(this.idServiceSelected);
        }
      },
      error : ()=>{
        console.log('delete Error');
        this.getAllFormeByService(this.idServiceSelected);

      }
    })
  }


  //Categorie service

  isCreateCategorieService : boolean = false;
  categorieServicePage(){

    this.isCreationService=false;
    this.isParametrage = false;
    this.isCreateCategorieService = true;

  }

  seeImageCategorieService : boolean = false;
  imageCategorieServiceToSend!:File;
  categorieImageUrl:string='';

  onSelectImageCategorieService(e :any){
    this.seeImageCategorieService = true;
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event :any)=>{

        this.categorieImageUrl = event.target.result ;

        this.imageCategorieServiceToSend = e.target.files[0];
    }

   }
  }

  listCategorieService : CategorieService[] = [];

  getAllCategorieService(){
    this.parametreService.getAllCategorieService().subscribe({
      next : (data :CategorieService[])=>{
        this.listCategorieService = data;
        console.log(this.listCategorieService);
        this.isCreateCategorieService = true;

      },
      error : ()=>{
        console.log('list categorie service : failed');
      }
    });
  }

  createCategorieService(){
    const formData : FormData = new FormData();

    formData.append("categorieservice", JSON.stringify(this.categorieServiceFb.value));
    formData.append("file", this.imageCategorieServiceToSend);
    this.parametreService.createCategorieService(formData).subscribe({
      next: (data :ServerResponse)=>{
        if (data.success) {
          this.getAllCategorieService();
          this.categorieServiceFb.reset();
          this.isCreateCategorieService = false ;
          alert(data.message);
        }
      },
      error : ()=>{
        console.log('create categorie service : failed');
      }
    });

  }

  deletCategorieService(idCategorieService :any){
    this.parametreService.deleteCategorieService(idCategorieService).subscribe({
      next : (data :ServerResponse)=>{
        this.ngOnInit();
        alert(data.message);


      },
      error : ()=>{
        console.log('Delete categorie service : failed');
      }
    })
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

  idCouleurSelected:number = 0 ;
  selectCouleur(c:Couleur){
    this.idCouleurSelected = c.idCouleur!;
  }
  createCouleur(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.couleurFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("couleur", JSON.stringify(this.couleurFb.value));

    this.parametreService.createCouleur(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.couleurFb.reset();
          this.getAllCouleurByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Couleur');
      }
    });
  }

  deleteCouleur(idCouleur:any){
    this.parametreService.deleteCouleur(idCouleur).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllCouleurByService(this.idServiceSelected);
        }
      },
      error : ()=>{
        console.log('delete Error');
        this.getAllCouleurByService(this.idServiceSelected);

      }
    })
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

  idFaceSelected:number = 0 ;
  selectFace(c:Faces){
    this.idFaceSelected = c.idFace!;
  }
  createFace(){
    const formData : FormData = new FormData;

    if (this.idServiceSelected!=0) {
      this.faceFb.controls['service'].setValue(this.idServiceSelected);
      }else{
        alert('Veillez choisir le service');
    }


    formData.append("faces", JSON.stringify(this.faceFb.value));
    console.log(this.faceFb);
    this.parametreService.createFaces(formData).subscribe({
      next : (data:ServerResponse)=>{
        if (data.success) {
          console.log(data.message);
          this.faceFb.reset();
          this.getAllFaceByService(this.idServiceSelected);

        }
      },
      error: ()=>{
        console.log('Erreur de création de Face');
      }
    });
  }

  deleteFace(idFace:any){
    this.parametreService.deleteFaces(idFace).subscribe({
      next : (data:ServerResponse)=>{
        if(data.success){
          console.log(data.message);
          this.getAllFaceByService(this.idServiceSelected);
        }
      },
      error : ()=>{
        console.log('delete Error');
        this.getAllFaceByService(this.idServiceSelected);

      }
    })
  }

  idFinitionParametre : number = 0 ;
  nomFinition : string  = '';
  getFinitionForParamatrage(f:Finition){
    this.idFinitionParametre = f.idFinition!;
    this.nomFinition = f.intitule;
    this.getAllFacturationFinitionByFinition(f.idFinition);
  }

  createFacturationFinition(){
    this.facturationFinitionFb.controls['finition'].setValue(this.idFinitionParametre);

    const formData : FormData = new FormData();
    formData.append("facturationfinition", JSON.stringify(this.facturationFinitionFb.value));

    this.parametreService.createFacturationFinition(formData).subscribe({
      next: (data)=>{
        if (data) {
          this.getAllFacturationFinitionByFinition(this.idFinitionParametre);
        }
      },
      error: ()=>{
        console.log('Create facturation finition');
      }
    })
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

  deleteFacturationFinition(idFinition:any){
     this.parametreService.delereFacturationFinition(idFinition).subscribe({
      next: (data)=>{
        if (data) {
          console.log('Facturation finition delete : true');
        }
      },
      error: ()=>{
        console.log('Create facturation finition');
      }
    })
  }



  idCouleurParametre : number = 0 ;
  nomCouleur : string  = ''
  getCouleurForParamatrage(f:Couleur){
    this.idCouleurParametre = f.idCouleur!;
    this.nomCouleur = f.intitule;
    this.getAllFacturationCouleurByFinition(f.idCouleur);
  }

  createFacturationCouleur(){
    this.facturationCouleurFb.controls['couleur'].setValue(this.idCouleurParametre);

    const formData : FormData = new FormData();
    formData.append("facturationcouleur", JSON.stringify(this.facturationCouleurFb.value));
    this.parametreService.createFacturationCouleur(formData).subscribe({
      next: (data)=>{
        if (data) {
          this.getAllFacturationCouleurByFinition(this.idCouleurParametre);
        }
      },
      error: ()=>{
        console.log('Create facturation couleur : failed');
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

  deleteFacturationCouleur(idFactCouleur:any){
     this.parametreService.deleteFacturationCouleur(idFactCouleur).subscribe({
      next: (data)=>{
        if (data) {
          console.log('Facturation couleur delete : true');
          this.getAllFacturationCouleurByFinition(this.idCouleurParametre)
        }
      },
      error: ()=>{
        console.log('Create facturation couleur ');
      }
    })
  }
}
