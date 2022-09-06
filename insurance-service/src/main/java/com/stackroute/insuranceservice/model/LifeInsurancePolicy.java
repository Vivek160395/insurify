package com.stackroute.insuranceservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@Document(indexName = "lifeinsurance", createIndex = true )
public class LifeInsurancePolicy {

    @Id
    private Integer policyId;
    private String policyName;
    private String policyDescription;
    private String insuranceType;
    private String policyBenefits;
    private String policyDocuments;
    private List<String> sumInsured;
    private List<String> premium;
    private List<String> policyDuration;
    private List<String> addOns;
    private List<String> addOnsPremium;
}
