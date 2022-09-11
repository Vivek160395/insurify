package com.stackroute.insuranceservice.model;

import com.carrotsearch.hppc.Generated;
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
<<<<<<< HEAD
    private String  policyId;
=======
    private int policyId;
>>>>>>> 314499d1fb8b8a80dab1cbf2717d38510c3fc482
    private String policyName;
    private String insuranceType;
    private String description;
    private List<Details> policyDetails;
    private List<Benefits> policyBenefits;
    private List<AddOnDetails> policyAddOnDetails;
    private String policyDocuments;



}
