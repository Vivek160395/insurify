package com.stackroute.purchaseinsuranceservice.service;

import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.CustomerClaim;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurancePurchase;
import com.stackroute.purchaseinsuranceservice.model.CustomerRenewal;

import java.text.ParseException;
import java.util.List;

public interface PurchaseService {

public CustomerInsurance savePurchasedInsurance(CustomerInsurancePurchase customerInsurancePurchase) throws PolicyIdAlreadyExistsException;
public Iterable<CustomerInsurance> getCustomerInsurances();

public  CustomerInsurance getPolicyDetailsByCustomerPolicyID(String customerPolicyId) throws PolicyIdNotFoundException;
public List<CustomerInsurance> getInsuranceByEmail(String email);

public boolean checkIfAlreadyPurchased(String email,String insurancePolicyId);

public boolean renewCustomerPolicy(CustomerRenewal customerRenewal) throws PolicyIdNotFoundException, ParseException, PolicyExpiredException;

public String claimInsurance(CustomerClaim customerClaim) throws PolicyIdNotFoundException;

public CustomerInsurance returnUserPolicyInformation(String customerPolicyId) throws PolicyIdNotFoundException;

}
