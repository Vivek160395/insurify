package com.stackroute.purchaseinsuranceservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutomobileInsurance {
    private String vehicleRegistrationNumber;
    private String category;
    private String engineNumber;
    private String chassisNumber;
    private String model;
}
