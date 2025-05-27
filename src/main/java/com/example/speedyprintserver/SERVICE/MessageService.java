package com.example.speedyprintserver.SERVICE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private JavaMailSender mailSender;

    public Boolean sendEmail(String toEmail, String subject , String body){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("samheroservices01@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);

        System.out.println("Mail Send successfully...");
        return  true;
    }
}
