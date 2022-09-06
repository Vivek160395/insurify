package com.stackroute.insuranceservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@Document(indexName = "customer")
public class AutomobileInsurancePolicy {
    @Id
    private Integer policyId;
    private String policyName;
    private String policyDescription;
    private String InsuranceType;
    private String policyFuelType;
    private String policyBenefits;
    private float policyAmount;
    private List<String> policyDuration;
    private List<String> addOns;
}
