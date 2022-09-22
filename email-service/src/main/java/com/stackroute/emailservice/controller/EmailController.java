package com.stackroute.emailservice.controller;

import com.stackroute.emailservice.model.Email;
import com.stackroute.emailservice.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/notification")
@Slf4j
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/textEmail")
    public String sendEmail(@RequestBody Email email)
    {
        try
        {
            log.info("Sending text email...");
            emailService.sendEmail(email);
            return "Email sent";
        }catch (Exception e)
        {
            return "Error in sending email.." +e;
        }
    }
}
