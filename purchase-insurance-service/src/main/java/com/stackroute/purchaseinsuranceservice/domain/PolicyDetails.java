package com.stackroute.purchaseinsuranceservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyDetails {

    long premiums;
    long durations;
    long sumInsure;
    int adults;
    int kids;
    long minSalary;
    long maxSalary;
    int minAge;
    int maxAge;

}
