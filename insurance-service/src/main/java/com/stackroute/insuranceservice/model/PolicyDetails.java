package com.stackroute.insuranceservice.model;

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
    int adults1;
    int adults2;
    int adults3;
    int kids;
    long minSalary;
    long maxSalary;

}
