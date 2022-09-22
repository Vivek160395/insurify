package com.stackroute.purchaseinsuranceservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddOnDetails {

    String addOnName;
    String addOnDescription;
    long addOnPremiums;
}
