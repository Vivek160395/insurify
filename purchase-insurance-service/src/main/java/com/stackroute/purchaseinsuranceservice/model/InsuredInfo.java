package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsuredInfo {
    private String insuredDOB;
    private String relation;
    public int weight;
    public int height;
    public String name;
    private boolean preExistingIllness;
    private String[] illnessList;

}
