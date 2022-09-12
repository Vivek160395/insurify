package com.stackroute.insuranceservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.io.File;
import java.util.List;

@Data
@NoArgsConstructor
@Document(indexName = "lifeinsurance" )
public class LifeInsurancePolicy {

    @Id
    private String policyId;
    private String policyName;
    private String insuranceType;
    private String description;
    private List<Details> policyDetails;
    private List<Benefits> policyBenefits;
    private List<AddOnDetails> policyAddOnDetails;
    private String policyDocuments;

    public LifeInsurancePolicy(String policyId, String policyName, String insuranceType, String description, List<Details> policyDetails, List<Benefits> policyBenefits, List<AddOnDetails> policyAddOnDetails, String policyDocuments) {
        this.policyId = policyId;
        this.policyName = policyName;
        this.insuranceType = insuranceType;
        this.description = description;
        this.policyDetails = policyDetails;
        this.policyBenefits = policyBenefits;
        this.policyAddOnDetails = policyAddOnDetails;
        this.policyDocuments = policyDocuments;
    }
}
