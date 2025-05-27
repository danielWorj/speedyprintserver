package com.example.speedyprintserver.CONTROLLER.User;

import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.ENTITY.User.Client;
import com.example.speedyprintserver.REPOSITORY.User.ClientRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@Controller
public class ControllerClientImpl implements ControllerClientInt {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public ResponseEntity<List<Client>> getAllClient() {
        return new ResponseEntity<>(this.clientRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServerResponse> createClient(String client) throws JsonProcessingException {
        ServerResponse serverResponse = new ServerResponse() ;

        Client clientFromFrontEnd = new ObjectMapper().readValue(client, Client.class);
        Client clientToSave = new Client();

        clientToSave.setNomUtilisateur(clientFromFrontEnd.getNomUtilisateur());
        clientToSave.setEmail(clientFromFrontEnd.getEmail());
        clientToSave.setContact(clientFromFrontEnd.getContact());
        clientToSave.setBankCard(clientFromFrontEnd.getBankCard());
        clientToSave.setOrigin(false);
        clientToSave.setPassword(clientFromFrontEnd.getPassword());
        this.clientRepository.save(clientFromFrontEnd);

        serverResponse.setSuccess(true);
        serverResponse.setMessage("Client cree : true");

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> updateClient(String client) throws JsonProcessingException {

        ServerResponse serverResponse = new ServerResponse() ;

        Client clientFromFrontEnd = new ObjectMapper().readValue(client, Client.class);
        Client clientUpdate = this.clientRepository.findById(clientFromFrontEnd.getIdUser()).orElse(null);

        if (Objects.nonNull(clientUpdate)){
            this.clientRepository.save(clientFromFrontEnd);

            serverResponse.setSuccess(true);
            serverResponse.setMessage("Client cree : true");
        }else{
            serverResponse.setSuccess(true);
            serverResponse.setMessage("Client cree : true");
        }

        return new ResponseEntity<>(serverResponse,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServerResponse> deleteClient(Integer idClient) {
        ServerResponse serverResponse = new ServerResponse();
        this.clientRepository.deleteById(idClient);
        serverResponse.setMessage("Delete Client : true");
        serverResponse.setSuccess(true);

        return new ResponseEntity<>(serverResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Client> createClientByMobile(Client client) {
        Client clientToSave = new Client();

        clientToSave.setNomUtilisateur(client.getNomUtilisateur());
        clientToSave.setEmail(client.getEmail());
        clientToSave.setContact(client.getContact());
        clientToSave.setBankCard(client.getBankCard());
        clientToSave.setOrigin(true); //1 => mobile

        this.clientRepository.save(clientToSave);

        Client clientLastSave = this.clientRepository.lastClientCreated();

        return new ResponseEntity<>(clientLastSave,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Integer> findCountCommande() {
        Integer count = (int) this.clientRepository.count();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }
}
