package com.stackroute.purchaseinsuranceservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerClaim {
    private String customerPolicyId;
    private String insurancePolicyId;
    private String email;
    private long   claimAmount;
    private String claimDate;
    private String claimSubmissionDate;
    private String description;
    private String claimType;
    private byte[] file;
}
