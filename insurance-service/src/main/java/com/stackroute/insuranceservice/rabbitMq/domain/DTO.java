package com.stackroute.insuranceservice.rabbitMq.domain;

import com.stackroute.insuranceservice.model.PolicyDetails;
import lombok.Data;

@Data
public class DTO {
    String policyId;
    String policyName;
    String insuranceType;
    String description;
    byte[] picByte;
}
