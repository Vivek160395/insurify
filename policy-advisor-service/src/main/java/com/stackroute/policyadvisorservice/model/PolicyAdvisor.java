package com.stackroute.policyadvisorservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class PolicyAdvisor {

    @Id
    private String emailId;

    private String password;

    private String userType;

    private String name;

    private String phoneNumber;

    private String gender;

    private String dateOfBirth;

    private String aadharNo;

    private String panNo;

    private int yearsOfExperience;

    private String[] category;

    private byte[] profilePic;

    private Rating[] ratings;
    private float averageRating;

}
