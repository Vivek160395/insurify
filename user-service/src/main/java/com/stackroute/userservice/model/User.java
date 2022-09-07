package com.stackroute.userservice.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;



@Document
@Data
public class User {

    @Transient
    public static final String SEQUENCE_NAME="user_sequence";



    private int userId;
    @Id
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
