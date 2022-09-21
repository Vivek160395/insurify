package com.stackroute.policyadvisorservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyAdvisor {

        @Id
    private String emailId;

    private String AdvisorName;

    private String phoneNumber;

    private String gender;

    private String dateOfBirth;

    //private long aadharNo;

    //private String panNo;

    private int YearsOfExperience;

    private String category;

    private byte[] profilePic;




}
