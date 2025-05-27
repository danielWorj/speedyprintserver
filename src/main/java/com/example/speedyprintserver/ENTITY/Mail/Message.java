package com.example.speedyprintserver.ENTITY.Mail;

import lombok.Data;

@Data
public class Message {
    private String toEmail ;
    private String subject ;
    private String body;
}
