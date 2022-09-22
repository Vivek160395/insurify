package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
    private String customerPolicyId;
    private String insurancePolicyId;
    private String policyType;
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
