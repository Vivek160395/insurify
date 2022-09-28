package com.stackroute.recommendationservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceProfile {
    String policyId;
    String policyName;
    String insuranceType;
    String description;
    byte[] picByte;
    String picType;
}
