package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRenewal {
    String customerPolicyId;
    int duration;
    int premium;
    String addOnName[];
    String date;
}
