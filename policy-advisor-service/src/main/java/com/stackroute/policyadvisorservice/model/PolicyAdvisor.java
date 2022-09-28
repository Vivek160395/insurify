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

    private char gender;

    private String dateOfBirth;

    private long aadharNo;

    private String panNo;

    private int YearsOfExperience;

    private List<String> category;

    private byte[] profilePic;

    private List<Rating> ratings;
    private float averageRating;

}
