package com.stackroute.purchaseinsuranceservice.service;

import com.stackroute.purchaseinsuranceservice.domain.Insurance;
import com.stackroute.purchaseinsuranceservice.exception.NoInsuranceFoundException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.CustomerClaim;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurancePurchase;
import com.stackroute.purchaseinsuranceservice.model.CustomerRenewal;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface PurchaseService {

    public CustomerInsurance savePurchasedInsurance(CustomerInsurancePurchase customerInsurancePurchase)
            throws PolicyIdAlreadyExistsException;

    public Iterable<CustomerInsurance> getCustomerInsurances();

    public Iterable<CustomerInsurance> getCustomerInsurancesByInusranceId(String insuranceId) throws NoInsuranceFoundException;

    public CustomerInsurance getPolicyDetailsByCustomerPolicyID(String customerPolicyId)
            throws PolicyIdNotFoundException;

    public Iterable<CustomerInsurance> getInsuranceByEmail(String email) throws NoInsuranceFoundException;

    public boolean checkIfAlreadyPurchased(String email, String insurancePolicyId);

    public boolean renewCustomerPolicy(CustomerRenewal customerRenewal)
            throws PolicyIdNotFoundException, ParseException, PolicyExpiredException;

    public String claimInsurance(CustomerClaim customerClaim) throws PolicyIdNotFoundException;

    public CustomerInsurance returnUserPolicyInformation(String customerPolicyId) throws PolicyIdNotFoundException;

    public int startUp(String email) throws ParseException;

    public int uploadDocument(MultipartFile documentFile, String policyId) throws IOException;

    public long returnUserCount(String insuranceID);

    public boolean updateClaimStatus(String customerId, String status);

    public Insurance returnInsuranceForRenewal(Insurance insurance, String customerPolicyId);
    public String checkRenewalStatus(String customerPolicyId,Insurance insurance) throws PolicyIdNotFoundException, ParseException;
}
