package com.stackroute.emailservice.service;

import com.stackroute.emailservice.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender mailSender;

//    @Value("${email.address}")
//    private String  attachEmailAdd;

    @Override
    public Email sendEmail(Email email) {

        SimpleMailMessage msg = new SimpleMailMessage();
        try
        {
            if(email.getToEmailId().contains(","))
            {
                String[] emails = email.getToEmailId().split(",");
                int recipientSize = emails.length;
                for(int i = 0; i< recipientSize; i++)
                {
                    msg.setTo(emails[i]);
                    msg.setSubject(email.getSubject());
                    msg.setText(email.getBody());
                    mailSender.send(msg);
                }
            }
            else
            {
                msg.setTo(email.getToEmailId());
                msg.setSubject(email.getSubject());
                msg.setText(email.getBody());
                mailSender.send(msg);
            }
        } catch(Exception e)
        {
            e.printStackTrace();
        }

        return email;
    }
}
