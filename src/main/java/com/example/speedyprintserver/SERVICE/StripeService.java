package com.example.speedyprintserver.SERVICE;

import com.example.speedyprintserver.DTO.Stripe.StripeResponse;
import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.stripe.Stripe;
import com.stripe.model.checkout.*;
import com.stripe.exception.StripeException;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
    //stripe API
    //product Name , montant , quantity , currency

    @Value("${stripe.secretKey}")
    private  String secretKey ;
    //la secrete value a été stocé dans le fichier applications properties
    public StripeResponse checkoutProducts(Commande commande){
        Long prixCommande = null;
        //Long prixCommande = Long.parseLong(String.valueOf((commande.getService().getPrixConception() + commande.getService().getPrixImpression())));

        //c'est une commande qu'on pay
        Stripe.apiKey=secretKey; //clé secrète

        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder().
                setName(commande.getService().getIntitule()).build();

        //prix de l'article
        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("XAF") //la dévise du prix
                .setUnitAmount(prixCommande)  //le montant
                .setProductData(productData) // et les informations du produit
                .build();

        //lineItem ci a toutes les informations sur le produit ( nom , qte , montant , ...)
        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(commande.getQuantite().longValue())
                .setPriceData(priceData)
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8080/success")
                .setCancelUrl("http://localhost:8080/cancel")
                .addLineItem(lineItem)
                .build();

        Session session = null ;

        try {
            session = Session.create(params);
        }catch (StripeException ex){
            System.out.println(ex.getMessage());
        }


        return  StripeResponse.builder()
                .status("SUCCESS")
                .message("Paiement effectué")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
}
