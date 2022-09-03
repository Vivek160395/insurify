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
    private Insurance insurance;
    private Age age;
    private InsuranceType insuranceType;
    private Occupation occupation;
}
