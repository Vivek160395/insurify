package com.stackroute.emailservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Claim {
    private String customerPolicyId;
    private String insurancePolicyId;
    private String email;
    private String name;
    private long  claimAmount;
    private String claimDate;
    private String claimType;
    private String startDate;
    private String endDate;
    private int duration;
    private long balance;
    private String status;
}
