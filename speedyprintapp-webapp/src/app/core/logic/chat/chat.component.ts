import { ServerResponse } from './../../Model/Server/ServerResponse';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../API/Services/Chat/chat.service';
import { Client } from '../../Model/Client/Client';
import { Message } from '../../Model/Chat/Message';
import { ClientService } from '../../API/Services/Client/client.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatForm !:FormGroup;

  constructor(private fb : FormBuilder, private chatService : ChatService , private clientService : ClientService){
    this.chatForm = this.fb.group({
      idMessage : new FormControl(),
      content : new FormControl(),
      statut : new FormControl(),
      localDate : new FormControl(),
      client : new FormControl(),
    })
  }
  ngOnInit(): void {

    this.getAllClientSendMessage();
  }


  listClient :Client[] = [];
  getAllClientSendMessage(){
    this.chatService.getClientSendMessage().subscribe({
      next : (data : Client[])=>{
        this.isViewMessage = true;
        this.listClient = data;

      },
      error : ()=>{
        console.log('list client : failed');
      }
    })
  }

  isViewMessage : boolean = false ;

  listMessage : Message[] = [] ;
  idClientSelected : number = 0 ;
  getAllMessageWithClient(id:number){
      this.idClientSelected = id ;

      this.getClientById(id);


      this.chatService.getAllMessageByClient(id).subscribe({
        next : (data : Message[])=>{

          this.isViewMessage = true;


          this.listMessage = data;


          console.log(this.listMessage);
        },
        error : ()=>{
          console.log('list all message with client : failed');
        }
      });
  }
  clientSelected : Client = new Client();
  getClientById(id:number){
    this.clientService.getClientById(id).subscribe({
      next : (data : Client)=>{
        this.clientSelected = data;
        console.log(this.clientSelected);
      },
      error : ()=>{
        console.log('fetch client by id : failed');
      }
    });
  }
  sendMessage(){
    let message :string = this.chatForm.controls['content'].value;
    if (message=='') {
      alert('Veillez entrer le message');
    }
    if (message!=" ") {
       const formData: FormData = new FormData();

      this.chatForm.controls['client'].setValue(this.idClientSelected);

      formData.append("message", JSON.stringify(this.chatForm.value));

      this.chatService.sendMessage(formData).subscribe({
        next : (data : ServerResponse)=>{
          if (data) {
            this.chatForm.reset();
            this.getAllClientSendMessage();
            this.getAllMessageWithClient(this.idClientSelected);
          }
        },
        error : ()=>{
          console.log('sned message : failed');
        }
      });
    }

  }


  isSearch : boolean = false ;
  listAllClient : Client[] = [];
  searchClient(){

    this.isSearch = true;

    this.clientService.getAllClient().subscribe({
      next: (data : Client[])=>{
        this.listAllClient = data;
      },
      error : ()=>{
        console.log('list all client failed');
      }
    })
  }


  chooseClientForChat(e:any){
    this.idClientSelected = e.target.value;
    this.getClientById(this.idClientSelected);
  }


}
