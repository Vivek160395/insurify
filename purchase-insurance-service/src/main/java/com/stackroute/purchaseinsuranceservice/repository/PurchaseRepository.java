package com.stackroute.purchaseinsuranceservice.repository;

import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends MongoRepository<CustomerInsurance,String> {

    public List<CustomerInsurance> getCustomerInsuranceByEmail(String email);
    public List<CustomerInsurance> getCustomerInsuranceByInsurancePolicyId(String insuranceId);


}
