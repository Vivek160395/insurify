package com.stackroute.insuranceservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Details {

    long premium;
    long duration;
    long sumInsure;
    Integer adults;
    Integer kids;
    long min_Salary;
    long max_salary;
}
