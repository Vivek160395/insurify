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
    private boolean preExistingIllness;
    private boolean[] illnessList;

//    private String[] illnessList;
}
