package com.example.speedyprintserver.CONTROLLER.Paiement;

import com.example.speedyprintserver.DTO.Commande.CommandeDTO;
import com.example.speedyprintserver.DTO.Stripe.StripeResponse;
import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.example.speedyprintserver.ENTITY.Service.Dimension;
import com.example.speedyprintserver.ENTITY.Service.Format;
import com.example.speedyprintserver.ENTITY.Service.ModeImpression;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.example.speedyprintserver.REPOSITORY.Commande.CommandeRepository;
import com.example.speedyprintserver.REPOSITORY.Service.DimensionRepository;
import com.example.speedyprintserver.REPOSITORY.Service.FormatRepository;
import com.example.speedyprintserver.REPOSITORY.Service.ModeImpressionRepository;
import com.example.speedyprintserver.REPOSITORY.Service.ServiceRepository;
import com.example.speedyprintserver.REPOSITORY.User.ClientRepository;
import com.example.speedyprintserver.SERVICE.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;

@Controller
public class PaiementControllerImpl implements PaiementControllerInt{
    @Autowired
    private StripeService stripeService;
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ModeImpressionRepository modeImpressionRepository;
    @Autowired
    private FormatRepository formatRepository;
    @Autowired
    private DimensionRepository dimensionRepository;
    @Override
    public ResponseEntity<StripeResponse> checkoutCommande(CommandeDTO commandeDTO) {
        Commande commandePaiement = new Commande();
        System.out.println(commandeDTO.toString());
        Client client = this.clientRepository.findById(commandeDTO.getClient()).orElse(null);
        Service service = this.serviceRepository.findById(commandeDTO.getService()).orElse(null);
        ModeImpression modeImpression = this.modeImpressionRepository.findById(commandeDTO.getModeImpression()).orElse(null);
        Dimension dimension  = this.dimensionRepository.findById(commandeDTO.getDimension()).orElse(null);
        Format format = this.formatRepository.findById(commandeDTO.getFormat()).orElse(null);

        LocalDate dateActuelle = LocalDate.now();

        commandePaiement.setClient(client);
        commandePaiement.setService(service);
        commandePaiement.setDateCreation(dateActuelle);
        commandePaiement.setDescription(commandePaiement.getDescription());
        commandePaiement.setQuantite(commandeDTO.getQuantite());
        commandePaiement.setOrigin(true);//vient de l'application mobile
        commandePaiement.setDateLivraison(LocalDate.parse(commandeDTO.getDateLivraison()));
        commandePaiement.setEtatCommande(null);//Au départ l'état commande sera en null et on affichera le message en ANALYSE
        commandePaiement.setModeImpression(modeImpression);
        commandePaiement.setDimension(dimension);
        commandePaiement.setFormat(format);

        System.out.println(commandePaiement);
        StripeResponse stripeResponse = this.stripeService.checkoutProducts(commandePaiement);

        return new  ResponseEntity<>(stripeResponse,HttpStatus.OK);


    }
}
