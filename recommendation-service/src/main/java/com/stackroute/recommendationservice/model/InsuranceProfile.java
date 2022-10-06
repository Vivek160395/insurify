package com.stackroute.recommendationservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceProfile {
    @Id
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
    private String userEmail;
}
