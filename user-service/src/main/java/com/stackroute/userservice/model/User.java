package com.stackroute.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

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
    private byte[] profilePic;
    public User(String emailId, String password, String userType, String name, String gender, int age,
            String dateOfBirth, long mobileNo, Address address, long aadharNo, String panNo) {
        this.emailId = emailId;
        this.password = password;
        this.userType = userType;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
        this.mobileNo = mobileNo;
        this.address = address;
        this.aadharNo = aadharNo;
        this.panNo = panNo;
    }
}
