package com.stackroute.purchaseinsuranceservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Insurance {

    private String policyId;
    private String policyName;
    private String insuranceType;
    private String policyDescription;
    private String category;
    private byte[] picByte;
    private String picType;
    private PolicyDetails[] policyDetails;
    private PolicyBenefits[] policyBenefits;
    private AddOnDetails[] addOnDetails;
    private String policyDocuments;
    private List<String> modelsAllowed;
}
