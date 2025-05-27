package com.example.speedyprintserver;

import com.example.speedyprintserver.SERVICE.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class SpeedyprintserverApplication {
	@Autowired
	private MessageService messageService;

	public static void main(String[] args) {
		SpringApplication.run(SpeedyprintserverApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void sendMail(){
		/**messageService.sendEmail("michelmarieenyegue002@gmail.com",
				"Subject",
				"body message");*/
	}

}
