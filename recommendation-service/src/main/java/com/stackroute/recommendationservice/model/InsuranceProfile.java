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
    private int insuranceId;
    private String insuranceName;
    private int age;
    private String insuranceType;
    private String occupation;
}
