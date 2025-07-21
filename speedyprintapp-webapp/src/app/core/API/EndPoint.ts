import { Client } from "../Model/Client/Client";
import { Conception } from "../Model/Parametre/Conception";

const apiUrl = "http://localhost:8080/api/speedyprint";

const abonnementUrl = `${apiUrl}/abonnement`;
const offreUrl = `${abonnementUrl}/offre`;
const detailsOffreUrl  = `${abonnementUrl}/details/offre`;

const clientURL = `${apiUrl}/client`;

const commandeUrl = `${apiUrl}/commande`;
const livraisonUrl  = `${commandeUrl}/livraison`;

const cartevisiteUrl = `${commandeUrl}/cartevisite`;

const devisCarteUrl = `${commandeUrl}/deviscartevisite`;

const parametrageURL = `${apiUrl}/parametrage`;

const etatCommandeUrl = `${commandeUrl}/etat`;

const imageCommandeUrl = `${commandeUrl}/imagecommande`;
const conceptionCommande = `${commandeUrl}/conception/commande`;
const chat = `${apiUrl}/message`;

const othersapiUrl = `${apiUrl}/othersapi`;

export const SpeedyPrintEndPoint = {
  Abonnement : {
    all : `${abonnementUrl}/all`,
    create : `${abonnementUrl}/create`,
    update : `${abonnementUrl}/update`,
    delete : `${abonnementUrl}/delete`,
    allByClient : `${abonnementUrl}/all/client`,
    allByOffre : `${abonnementUrl}/all/offre`
  },
  Offre : {
    all : `${offreUrl}/all`,
    create : `${offreUrl}/create`,
    update : `${offreUrl}/update`,
    delete : `${offreUrl}/delete`,
  },
  DetailsOffre : {
    all : `${detailsOffreUrl}/all`,
    create : `${detailsOffreUrl}/create`,
    update : `${detailsOffreUrl}/update`,
    delete : `${detailsOffreUrl}/delete`
  },
  Client : {
    all : `${clientURL}/all`,
    byId : `${clientURL}/byId`,
    create : `${clientURL}/create`,
    update : `${clientURL}/update`,
    delete : `${clientURL}/delete`,
    count : `${clientURL}/count`

  },
  CarteVisite : {
    all : `${cartevisiteUrl}/all`,
    byClient : `${cartevisiteUrl}/client`,
    commande : `${cartevisiteUrl}/create/fromPC`,
    delete : `${cartevisiteUrl}/delete`
  },
  DevisCarteVisite : {
    allByCarte : `${devisCarteUrl}/findByCarte`,
    create : `${devisCarteUrl}/create`,
    delete : `${devisCarteUrl}/delete`
  },
  Parametrage : {
    service : {
      all: `${parametrageURL}/service/all`,
      byId : `${parametrageURL}/service/byid`,
      bycategorieservice : `${parametrageURL}/service/bycategorieservice`,
      create : `${parametrageURL}/service/create`,
      delete : `${parametrageURL}/service/delete`,
    },
    CategorieService : {
      all : `${parametrageURL}/categorieservice/all`,
      create : `${parametrageURL}/categorieservice/create`,
      delete : `${parametrageURL}/categorieservice/delete`
    },
    ModeImpression : {
      all : `${parametrageURL}/mi/all`,
      byId : `${parametrageURL}/mi/byId`,
      byService : `${parametrageURL}/mi/byservice`,
      create : `${parametrageURL}/mi/create`,
      delete : `${parametrageURL}/mi/delete`,
    },
    Format : {
      all : `${parametrageURL}/format/all`,
      byId : `${parametrageURL}/format/byId`,
      byservice : `${parametrageURL}/format/byservice`,
      create : `${parametrageURL}/format/create`,
      delete : `${parametrageURL}/format/delete`
    },
    Dimension : {
      all : `${parametrageURL}/dim/all`,
      byId : `${parametrageURL}/dim/byId`,
      byservice : `${parametrageURL}/dim/byservice`,
      create : `${parametrageURL}/dim/create`,
      delete : `${parametrageURL}/dim/delete`,
    },
    Conception : {
      all : `${parametrageURL}/conception/all`,
      byId : `${parametrageURL}/conception/byid`,
      allByService : `${parametrageURL}/conception/all/byservice`,
      create : `/conception/create`,
      delete : `/conception/delete`,
    },
    Impression : {//C'est la relation quantite à imprimer , prix d'impression et remise
      all : `${parametrageURL}/impression/all`,
      findById : `${parametrageURL}/impression/findbyid`,
      byservice : `${parametrageURL}/impression/byservice`,
      create: `${parametrageURL}/impression/create`,
      delete: `${parametrageURL}/impression/delete`,

    },
    TypePapier : {
      all : `${parametrageURL}/typepapier/all`,
      byId : `${parametrageURL}/typepapier/byId`,
      byservice : `${parametrageURL}/typepapier/byservice`,
      create : `${parametrageURL}/typepapier/create`,
      delete : `${parametrageURL}/typepapier/delete`,
    },
    Grammage : {
      all : `${parametrageURL}/grammage/all`,
      byId : `${parametrageURL}/grammage/byId`,
      byservice : `${parametrageURL}/grammage/byservice`,
      create : `${parametrageURL}/grammage/create`,
      delete : `${parametrageURL}/grammage/delete`,
    },
    Finition : {
      all : `${parametrageURL}/finition/all`,
      byId : `${parametrageURL}/finition/byId`,
      byservice : `${parametrageURL}/finition/byservice`,
      create : `${parametrageURL}/finition/create`,
      delete : `${parametrageURL}/finition/delete`,
    },
    Formes : {
      all : `${parametrageURL}/formes/all`,
      byId : `${parametrageURL}/formes/byId`,
      byservice : `${parametrageURL}/formes/byservice`,
      create : `${parametrageURL}/formes/create`,
      delete : `${parametrageURL}/formes/delete`,
    },
    Couleurs : {
      allByService : `${parametrageURL}/couleur/all/byservice`,
      byId : `${parametrageURL}/couleur/byId`,
      create : `${parametrageURL}/couleur/create`,
      delete : `${parametrageURL}/couleur/delete`
    },
    Faces : {
      allByService : `${parametrageURL}/faces/all/byservice`,
      byId : `${parametrageURL}/faces/byId`,
      create : `${parametrageURL}/faces/create`,
      delete : `${parametrageURL}/faces/delete`
    },
    FacturationFinition : {
      allByIdFinition : `${parametrageURL}/facturation/byfinition/all`,
      create : `${parametrageURL}/facturation/finition/create`,
      delete : `${parametrageURL}/facturation/finition/delete`,
    },
    FacturationCouleur : {
      allByIdCouleur : `${parametrageURL}/facturation/bycouleur/all`,
      create : `${parametrageURL}/facturation/couleur/create`,
      delete : `${parametrageURL}/facturation/couleur/delete`,
    }
  }
  ,
  Commande : {
    all : `${commandeUrl}/all`,
    allbyclient : `${commandeUrl}/allbyClient`,
    findById : `${commandeUrl}/findById`,
    create : `${commandeUrl}/bypc/create/file`,
    delete : `${commandeUrl}/delete`,
    countall : `${commandeUrl}/count`,
    countByOrigin : `${commandeUrl}/count/byorigin/mob`,
    allServiceList : `${commandeUrl}/allservice/list`,
    allServiceCount : `${commandeUrl}/allservice/count`,
    allMonth : `${commandeUrl}/list/month`,
    qteByMonth : `${commandeUrl}/list/quantite/bymonth`,
    EtatCommande : {
      all : `${etatCommandeUrl}/all`,
      changeEtat:  `${etatCommandeUrl}/change`
    },
    ImageCommnde : {
      byCommande : `${imageCommandeUrl}/bycommande`
    },
    ConceptionConception : {
      all : `${conceptionCommande}/all/bycommande`,
      create : `${conceptionCommande}/create`,
      delete : `${conceptionCommande}/delete`
    },
  },
  Livraison : {
    all : `${livraisonUrl}/all`,
    create : `${livraisonUrl}/create`,
    delete : `${livraisonUrl}/delete`,
    count : `${livraisonUrl}/count`,
    allServiceList : `${livraisonUrl}/allservice/list`,
    allServiceCount : `${livraisonUrl}/allservice/count`,
    qteByMonth : `${livraisonUrl}/listqte/bymonth`,
    allMonth : `${livraisonUrl}/month`
  },

  TierService : {
    mailsender : `${othersapiUrl}/mail/sender`,
  },

  Chat : {
    allByClient : `${chat}/all/byclient`,
    allClient : `${chat}/all/client`,
    sendMessage : `${chat}/speedy/send`,
    updateMessage : `${chat}/speedy/update`,
    delete : `${chat}/delete`
  }

}
