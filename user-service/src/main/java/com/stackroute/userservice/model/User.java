package com.stackroute.userservice.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Transient;


@Document
@Data
public class User {

    @Transient
    public static final String SEQUENCE_NAME="user_sequence";


    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int userId;
    private String emailId;
    private String password;
    private String userType;
    private String name;
    private String gender;
    private int age;
    private String dateOfBirth;
    private long mobileNo;
    private Address address;
    private long aadharNo;
    private String panNo;
    private String profilePic;



}