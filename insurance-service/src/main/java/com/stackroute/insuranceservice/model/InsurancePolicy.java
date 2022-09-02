package com.stackroute.insuranceservice.model;

import lombok.Data;

@Data
public class InsurancePolicy {

    Integer policyId;
    String policyName;
    String policyDescription;
    Integer policyDuration;
    String insuranceType;

    public InsurancePolicy() {
    }
}
