package com.stackroute.purchaseinsuranceservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyDetails {

    int premiums;
    int durations;
    long sumInsure;
    int adults1;
    int adults2;
    int adults3;
    int kids;
    long minSalary;
    long maxSalary;


}
