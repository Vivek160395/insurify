package com.stackroute.emailservice.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Email {


    private String toEmailId;
    private String subject;
    private String body;
}
