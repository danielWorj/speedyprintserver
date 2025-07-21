import { Routes } from '@angular/router';
import { CommandeComponent } from './core/logic/commande/commande.component';

export const routes: Routes = [
  {
    path : '',
    loadComponent : ()=>import('./core/logic/dashboard/dashboard.component').then((d)=>d.DashboardComponent),
  },
  {
    path : 'dashboard',
    loadComponent : ()=>import('./core/logic/dashboard/dashboard.component').then((d)=>d.DashboardComponent),
  },
  {
    path : 'admin',
    loadComponent : ()=>import('./core/logic/dashboard/dashboard.component').then((d)=>d.DashboardComponent),
  },
  {
    path : 'commande',
    //component : CommandeComponent
    loadComponent : ()=>import('./core/logic/commande/commande.component').then((c)=>c.CommandeComponent),
  },
  {
    path : 'client',
    loadComponent : ()=>import('./core/logic/client/client.component').then((c)=>c.ClientComponent),
  },
  {
    path : 'abonnement',
    loadComponent : ()=>import('./core/logic/abonnement/abonnement.component').then((a)=>a.AbonnementComponent),
  },
  {
    path : 'livraison',
    loadComponent : ()=>import('./core/logic/livraison/livraison.component').then((l)=>l.LivraisonComponent),
  },
  {
    path : 'chat',
    loadComponent : ()=>import('./core/logic/chat/chat.component').then((c)=>c.ChatComponent),
  }
  ,
  {
    path : 'setting',
    loadComponent : ()=>import('./core/logic/setting/setting.component').then((s)=>s.SettingComponent),
  }
  ,
  {
    path : 'service',
    loadComponent : ()=>import('./core/logic/service/service.component').then((s)=>s.ServiceComponent),
  }
];
