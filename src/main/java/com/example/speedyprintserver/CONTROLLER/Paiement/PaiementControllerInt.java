package com.example.speedyprintserver.CONTROLLER.Paiement;

import com.example.speedyprintserver.DTO.Commande.CommandeDTO;
import com.example.speedyprintserver.DTO.Stripe.StripeResponse;
import com.example.speedyprintserver.ENTITY.Commande.Commande;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/speedyprint/paiement/")
@CrossOrigin("*")
public interface PaiementControllerInt {

    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> checkoutCommande( CommandeDTO commandeDTO);
}
