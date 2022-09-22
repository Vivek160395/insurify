package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInsurancePurchase {
    private String customerPolicyId;
    private String insurancePolicyId;

    private String email;

    private long sumInsured;
    private String startDate;
    private String purchaseDate;
    private String endDate;
    private int duration;
    private String[] addOnName;
    private int premium;
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
    private boolean status=true;

}
