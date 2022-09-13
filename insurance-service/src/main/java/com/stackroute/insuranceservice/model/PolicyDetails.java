package com.stackroute.insuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyDetails {

    long premiums;
    long durations;
    long sumInsure;
    Integer adults;
    Integer kids;
    long minSalary;
    long maxSalary;
    Integer minAge;
    Integer maxAge;
    List<String> modelsAllowed;
}
