package com.stackroute.insuranceservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document(indexName = "customer")
public class AutomobileInsurancePolicy {
    @Id
    Integer policyId;
    String policyName;
    String policyDescription;
    String InsuranceType;
    String policyFuelType;
    String policyBenefits;
    String policyVehicleId;
    Date policyStartDate;
    Date policyExpiryDate;
    float policyAmount;
    List<String> policyDuration;
    List<String> addOns;
}
