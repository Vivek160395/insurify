package com.stackroute.emailservice.controller;

import com.stackroute.emailservice.model.Email;
import com.stackroute.emailservice.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@RequestMapping("/v1/notification")
@Slf4j
public class EmailController {

    @Autowired
    private EmailService emailService;

    public EmailController(EmailService emailService) {
        log.info("constructing EmailController...");
        this.emailService = emailService;
    }

    @PostMapping("/textEmail")
    public ResponseEntity<?> sendEmail(@RequestBody Email email) throws MessagingException, IOException
    {
        try
        {
            log.info("Sending text email...");
            emailService.sendEmail(email);
            return new ResponseEntity<>("Email sent Successfully", HttpStatus.OK);
        }catch (Exception e)
        {
            return new ResponseEntity<>("Error occurs due to exception",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
