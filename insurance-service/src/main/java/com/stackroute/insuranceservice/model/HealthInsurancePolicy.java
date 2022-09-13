package com.stackroute.insuranceservice.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "healthinsurance")
public class HealthInsurancePolicy {

    @Id
    private String  policyId;
    private String policyName;
    private String insuranceType;
    private String policyDescription;
    private String category;
    private byte[] image;
    private List<PolicyDetails> policyDetails;
    private List<PolicyBenefits> policyBenefits;
    private List<AddOnDetails> addOnDetails;
    private String policyDocuments;



}
