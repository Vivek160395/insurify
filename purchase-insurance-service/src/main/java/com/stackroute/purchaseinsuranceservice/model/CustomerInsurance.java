package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInsurance {
    @Id
    private String customerPolicyId;
    private String insurancePolicyId;
    private String policyType;
    private String email;
    private long sumInsured;
    private List<String> startDate=new ArrayList<>();
    private List<String> endDate=new ArrayList<>();

    private List<String> purchaseDate=new ArrayList<>();
    private List<Integer> duration=new ArrayList<>();
    private List<String[]> addOnName=new ArrayList<>();
    private List<Integer> premium=new ArrayList<>();
    private String name;
    private long mobile;
    private String address;
    private int pincode;
    private String city;
    private String state;
    private String nameOfNominee;
    private String nomineeDOB;
    private String relation;
    private HealthInsurance healthInsurance;
    private LifeInsurance lifeInsurance;
    private AutomobileInsurance automobileInsurance;

    private boolean renewalStatus=false;

    private List<Long> claimSum=new ArrayList<>();

    private List<String> claimDate=new ArrayList<>();
    private List<String> claimType=new ArrayList<>();
    private List<String> claimDescription=new ArrayList<>();
    private List<String> claimStatus=new ArrayList<>();

    private boolean status=true;
}
