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
    private String description;
    private byte[] image;
    private List<Details> policyDetails;
    private List<Benefits> policyBenefits;
    private List<AddOnDetails> policyAddOnDetails;
    private String policyDocuments;



}
