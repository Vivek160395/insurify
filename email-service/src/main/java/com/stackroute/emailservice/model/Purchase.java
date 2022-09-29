package com.stackroute.emailservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {
    private String customerPolicyId;
    private String insurancePolicyId;
//    private String policyType;
    private String email;
    private long sumInsured;
    private String startDate;
    private String purchaseDate;
    private String endDate;
    private int duration;
    private String[] addOnName;
    private int premium;
    private String name;
}
