package com.stackroute.purchaseinsuranceservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerClaim {
    String customerPolicyId;
    String insurancePolicyId;
    String email;
    long claimAmount;
    String claimDate;
}
