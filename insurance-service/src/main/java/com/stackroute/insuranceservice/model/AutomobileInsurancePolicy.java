package com.stackroute.insuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "automobileinsurance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutomobileInsurancePolicy {

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
