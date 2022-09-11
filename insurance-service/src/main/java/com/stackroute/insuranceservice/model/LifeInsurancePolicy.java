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
}
