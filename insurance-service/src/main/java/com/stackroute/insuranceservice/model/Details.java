package com.stackroute.insuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
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
