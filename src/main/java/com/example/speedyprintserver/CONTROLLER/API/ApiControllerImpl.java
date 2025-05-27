package com.example.speedyprintserver.CONTROLLER.API;

import com.example.speedyprintserver.ENTITY.Mail.Message;
import com.example.speedyprintserver.ENTITY.Response.ServerResponse;
import com.example.speedyprintserver.SERVICE.MessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
public class ApiControllerImpl implements ApiControllerInt {
    @Autowired
    private MessageService messageService;
    @Override
    public ResponseEntity<ServerResponse> sendMailToClientEndConception(String message) throws JsonProcessingException {

        Message messageToSend  = new ObjectMapper().readValue(message, Message.class);

        Boolean test = this.messageService.sendEmail(
                messageToSend.getToEmail(),
                messageToSend.getSubject(),
                messageToSend.getSubject());
        ServerResponse serverResponse = new ServerResponse();
        if (test){
            serverResponse.setMessage("Messsage Envoyé");
            serverResponse.setSuccess(true);
        }else{
            serverResponse.setSuccess(false);
        }
        return new ResponseEntity<>(serverResponse, HttpStatus.OK);
    }
}
