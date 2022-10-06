package com.stackroute.purchaseinsuranceservice.service;

import com.stackroute.purchaseinsuranceservice.config.Producer;
import com.stackroute.purchaseinsuranceservice.domain.Insurance;
import com.stackroute.purchaseinsuranceservice.domain.PolicyDetails;
import com.stackroute.purchaseinsuranceservice.exception.NoInsuranceFoundException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.*;
import com.stackroute.purchaseinsuranceservice.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Service
public class PurchaseServiceImplementation implements PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private Producer producer;

    @Override
    public CustomerInsurance savePurchasedInsurance(CustomerInsurancePurchase customerInsurancePurchase)
            throws PolicyIdAlreadyExistsException {
        PurchaseDTO purchaseDTO = new PurchaseDTO();
        if (purchaseRepository.findById(customerInsurancePurchase.getCustomerPolicyId()).isPresent()) {
            throw new PolicyIdAlreadyExistsException();
        } else {
            CustomerInsurance ci = new CustomerInsurance();
            ci.setCustomerPolicyId(customerInsurancePurchase.getCustomerPolicyId());
            ci.setInsurancePolicyId(customerInsurancePurchase.getInsurancePolicyId());

            // ci.setPolicyType(customerInsurancePurchase.getPolicyType());

            // ci.setPolicyType(customerInsurancePurchase.getPolicyType());

            ci.setEmail(customerInsurancePurchase.getEmail());
            ci.setSumInsured(customerInsurancePurchase.getSumInsured());
            ci.getStartDate().add(customerInsurancePurchase.getStartDate());
            ci.getEndDate().add(customerInsurancePurchase.getEndDate());
            ci.getPremium().add(customerInsurancePurchase.getPremium());

            ci.getDuration().add(customerInsurancePurchase.getDuration());
            ci.getAddOnName().add(customerInsurancePurchase.getAddOnName());
            ci.setName(customerInsurancePurchase.getName());
            ci.setMobile(customerInsurancePurchase.getMobile());
            ci.setAddress(customerInsurancePurchase.getAddress());
            ci.setPincode(customerInsurancePurchase.getPincode());
            ci.setCity(customerInsurancePurchase.getCity());
            ci.setState(customerInsurancePurchase.getState());
            ci.setNameOfNominee(customerInsurancePurchase.getNameOfNominee());
            ci.setNomineeDOB(customerInsurancePurchase.getNomineeDOB());
            ci.setRelation(customerInsurancePurchase.getRelation());
            ci.setHealthInsurance(customerInsurancePurchase.getHealthInsurance());
            ci.setAutomobileInsurance(customerInsurancePurchase.getAutomobileInsurance());
            ci.setLifeInsurance(customerInsurancePurchase.getLifeInsurance());
            producer.sendMessageToRabbitMq(ci);

            purchaseDTO.setCustomerPolicyId(customerInsurancePurchase.getCustomerPolicyId());
            purchaseDTO.setInsurancePolicyId(customerInsurancePurchase.getInsurancePolicyId());
            purchaseDTO.setEmail(customerInsurancePurchase.getEmail());
            purchaseDTO.setName(customerInsurancePurchase.getName());

            // purchaseDTO.setPolicyType(customerInsurancePurchase.getPolicyType());

            // purchaseDTO.setPolicyType(customerInsurancePurchase.getPolicyType());

            purchaseDTO.setSumInsured(customerInsurancePurchase.getSumInsured());

            purchaseDTO.setStartDate(customerInsurancePurchase.getStartDate());
            purchaseDTO.setEndDate(customerInsurancePurchase.getEndDate());
            purchaseDTO.setDuration(customerInsurancePurchase.getDuration());
            purchaseDTO.setAddOnName(customerInsurancePurchase.getAddOnName());
            purchaseDTO.setPremium(customerInsurancePurchase.getPremium());
            producer.sendMessageForPurchase(purchaseDTO);
            return purchaseRepository.save(ci);
        }
    }

    @Override
    public Iterable<CustomerInsurance> getCustomerInsurances() {
        System.out.println(purchaseRepository.findAll());
        return purchaseRepository.findAll();
    }

    @Override
    public Iterable<CustomerInsurance> getCustomerInsurancesByInsuranceId(String insuranceId)
            throws NoInsuranceFoundException {
        Iterable<CustomerInsurance> customerInsurances;

        customerInsurances = purchaseRepository.getCustomerInsuranceByInsurancePolicyId(insuranceId);

        if (customerInsurances == null) {
            throw new NoInsuranceFoundException();
        }
        System.out.println(customerInsurances);
        return customerInsurances;
    }

    @Override
    public CustomerInsurance getPolicyDetailsByCustomerPolicyID(String customerPolicyId)
            throws PolicyIdNotFoundException {
        if (!purchaseRepository.findById(customerPolicyId).isPresent()) {
            throw new PolicyIdNotFoundException();
        } else {
            return purchaseRepository.findById(customerPolicyId).get();
        }
    }

    @Override
    public Iterable<CustomerInsurance> getInsuranceByEmail(String email) throws NoInsuranceFoundException {
        Iterable<CustomerInsurance> customerInsurances;

        customerInsurances = purchaseRepository.getCustomerInsuranceByEmail(email);

        if (customerInsurances == null) {
            throw new NoInsuranceFoundException();
        }
        System.out.println(customerInsurances);
        return customerInsurances;
    }

    @Override
    public boolean checkIfAlreadyPurchased(String email, String insurancePolicyId) {
        List<CustomerInsurance> customerInsurances = new ArrayList<>();
        purchaseRepository.getCustomerInsuranceByEmail(email).forEach(customerInsurances::add);
        CustomerInsurance customerInsurance;

        for (int i = 0; i < customerInsurances.size(); i++) {
            System.out.println("Inside the customerInsurances list");

            customerInsurance = customerInsurances.get(i);

            System.out.println(customerInsurance.getInsurancePolicyId());
            if (customerInsurance.getInsurancePolicyId().equalsIgnoreCase(insurancePolicyId)) {
                System.out.println("Already purchased the insurance");
                return false;
            }
        }
        return true;

    }

    @Override
    public boolean renewCustomerPolicy(CustomerRenewal customerRenewal)
            throws PolicyIdNotFoundException, ParseException, PolicyExpiredException {
        RenewDTO renewDTO = new RenewDTO();
        System.out.println("ID:" + customerRenewal.getCustomerPolicyId());

        if (!purchaseRepository.findById(customerRenewal.getCustomerPolicyId()).isPresent()) {
            throw new PolicyIdNotFoundException();
        }
        CustomerInsurance customerInsurance = purchaseRepository.findById(customerRenewal.getCustomerPolicyId()).get();
        List<String> endDayList = customerInsurance.getEndDate();

        String startDay = endDayList.get(endDayList.size() - 1);
        if (customerRenewal.getDate().compareTo(startDay) > 0) {
            throw new PolicyExpiredException();
        }
        String endDate = "";
        System.out.println(startDay);
        String sDay = customerInsurance.getStartDate().get(customerInsurance.getStartDate().size() - 1);
        String eDay = startDay;
        String ourDate = customerRenewal.getDate();
        System.out.println("Status of : " + (sDay.compareTo(ourDate) < 0 && eDay.compareTo(ourDate) > 0));
        System.out.println("Start Date:" + sDay + "End Date :" + eDay + "Our date :" + ourDate);
        if (!(sDay.compareTo(ourDate) < 0) || !(eDay.compareTo(ourDate) >= 0)) {
            System.out.println("Cannot renew now because of policy  time interval is not valid");
            return false;
        }
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c1 = Calendar.getInstance();
        c1.setTime(sdf1.parse(eDay));
        c1.add(Calendar.DATE, -60); // number of days to add
        String cutOffDate = sdf1.format(c1.getTime());
        System.out.println("Cut Off date for renewing insurance :  " + cutOffDate);
        System.out.println("Cut Off status : " + (cutOffDate.compareTo(ourDate) > 0));
        if (cutOffDate.compareTo(ourDate) >= 0) {
            System.out.println("Renew possible only before 60 days of policy expiry");
            return false;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(sdf.parse(startDay));
        c.add(Calendar.DATE, 1); // number of days to add
        startDay = sdf.format(c.getTime());
        System.out.println("Policy renewal starts from" + startDay);
        c.add(Calendar.YEAR, customerRenewal.getDuration());
        c.add(Calendar.DATE, -1);
        endDate = sdf.format(c.getTime());
        System.out.println("Policy Ends on " + endDate);
        customerInsurance.getStartDate().add(startDay);
        customerInsurance.getEndDate().add(endDate);
        customerInsurance.getPremium().add(customerRenewal.getPremium());
        customerInsurance.getAddOnName().add(customerRenewal.getAddOnName());
        customerInsurance.getDuration().add(customerRenewal.getDuration());
        customerInsurance.setRenewalStatus(true);
        purchaseRepository.save(customerInsurance);

        renewDTO.setCustomerPolicyId(customerInsurance.getCustomerPolicyId());
        renewDTO.setInsurancePolicyId(customerInsurance.getInsurancePolicyId());

        // renewDTO.setPolicyType(customerInsurance.getPolicyType());

        renewDTO.setEmail(customerInsurance.getEmail());
        renewDTO.setSumInsured(customerInsurance.getSumInsured());
        renewDTO.setStartDate(startDay);
        renewDTO.setPurchaseDate(customerRenewal.getDate());
        renewDTO.setEndDate(endDate);
        renewDTO.setDuration(customerRenewal.getDuration());
        renewDTO.setAddOnName(customerRenewal.getAddOnName());
        renewDTO.setPremium(customerRenewal.getPremium());
        renewDTO.setName(customerInsurance.getName());
        producer.sendMessageForRenew(renewDTO);
        return true;
    }

    @Override
    public String claimInsurance(CustomerClaim customerClaim) throws PolicyIdNotFoundException {
        ClaimDTO claimDTO = new ClaimDTO();
        if (!purchaseRepository.findById(customerClaim.getCustomerPolicyId()).isPresent()) {
            System.out.println("Throwing error in id not found");
            throw new PolicyIdNotFoundException();
        }

        CustomerInsurance ci = purchaseRepository.findById(customerClaim.getCustomerPolicyId()).get();
        if (!ci.getEmail().equalsIgnoreCase(customerClaim.getEmail())) {
            throw new PolicyIdNotFoundException();
        }
        if ((ci.getClaimStatus().size() != 0)) {
            String lastClaimStatus = ci.getClaimStatus().get(ci.getClaimStatus().size() - 1);
            if (lastClaimStatus.equalsIgnoreCase("pending")) {
                return "Previous Claims are still pending.Please wait for the older claims to settle in order to raise new claim ";
            }
        }
        // check for policy in given date
        List<String> startD = ci.getStartDate();
        List<String> endD = ci.getEndDate();
        int resultIndex = -1;
        for (int k = 0; k < startD.size(); k++) {
            String startDate = startD.get(k);
            String ourDate = customerClaim.getClaimDate();
            String endDate = endD.get(k);
            if (startDate.compareTo(ourDate) < 0 && endDate.compareTo(ourDate) > 0) {
                resultIndex = k;
                break;
            }
        }
        if (resultIndex == -1) {
            ci.setStatus(false);
            return "No active Policy to claim";
        }
        long totalClaim = 0;
        // checking for if the insured sum is sufficient for claimed amount
        for (int i = 0; i < ci.getClaimSum().size(); i++) {
            if (ci.getStartDate().get(resultIndex).compareTo(ci.getClaimDate().get(i)) < 0
                    && ci.getEndDate().get(resultIndex).compareTo(ci.getClaimDate().get(i)) > 0) {
                if (ci.getClaimStatus().get(i).equalsIgnoreCase("approved")) {
                    totalClaim = totalClaim + ci.getClaimSum().get(i);
                }
            }
        }
        if (totalClaim >= ci.getSumInsured()) {
            ci.setStatus(false);
            return "Insured amount has been Exhausted.Purchase a new Policy to avail Benefits";
        }
        ci.getClaimSubmissionDate().add(customerClaim.getClaimSubmissionDate());
        claimDTO.setCustomerPolicyId(ci.getCustomerPolicyId());
        claimDTO.setInsurancePolicyId(ci.getInsurancePolicyId());
        claimDTO.setEmail(ci.getEmail());
        claimDTO.setName(ci.getName());
        claimDTO.setClaimAmount(customerClaim.getClaimAmount());
        claimDTO.setClaimDate(customerClaim.getClaimDate());
        claimDTO.setClaimType(customerClaim.getClaimType());
        claimDTO.setStartDate(ci.getStartDate().get(resultIndex));
        claimDTO.setEndDate(ci.getEndDate().get(resultIndex));
        claimDTO.setDuration(ci.getDuration().get(resultIndex));
        claimDTO.setBalance(ci.getSumInsured() - totalClaim);
        if ((totalClaim + customerClaim.getClaimAmount()) > ci.getSumInsured()) {
            long partialClaim = ci.getSumInsured() - totalClaim;
            ci.getClaimSum().add(partialClaim);
            ci.getClaimDate().add(customerClaim.getClaimDate());
            ci.getClaimStatus().add("pending");

            purchaseRepository.save(ci);
            claimDTO.setStatus("Partial Claim");
            producer.sendMessageForClaim(claimDTO);
            System.out.println("Total claim amount:" + totalClaim + customerClaim.getClaimAmount() + "/n Sum"
                    + ci.getSumInsured());
            return "Your partial claim of " + partialClaim
                    + " is submitted to Insurer because of crossing insured amount limit in the policy";
        }
        ci.getClaimSum().add(customerClaim.getClaimAmount());
        ci.getClaimDate().add(customerClaim.getClaimDate());
        ci.getClaimDescription().add(customerClaim.getDescription());
        ci.getClaimType().add(customerClaim.getClaimType());

        ci.getClaimStatus().add("pending");
        purchaseRepository.save(ci);
        claimDTO.setStatus("Full Claim");
        producer.sendMessageForClaim(claimDTO);
        return "Your claim is submitted to the Insurer";
    }

    @Override
    public CustomerInsurance returnUserPolicyInformation(String customerPolicyId) throws PolicyIdNotFoundException {
        if (!purchaseRepository.findById(customerPolicyId).isPresent()) {
            throw new PolicyIdNotFoundException();
        }
        CustomerInsurance customer_insurance = purchaseRepository.findById(customerPolicyId).get();
        return customer_insurance;
    }

    public long returnUserCount(String insuranceID) {
        long count = 0;
        long total = 0;
        List<CustomerInsurance> customer_insurance_list = purchaseRepository.findAll();
        if (customer_insurance_list == null)
            return 0;
        // customer_insurance_list.stream().filter((a)->a.getInsurancePolicyId().equalsIgnoreCase(insuranceID));
        System.out.println(insuranceID);
        for (int i = 0; i < customer_insurance_list.size(); i++) {
            if (customer_insurance_list.get(i).getInsurancePolicyId().equalsIgnoreCase(insuranceID)) {
                count++;
            }
        }
        total = customer_insurance_list.size();
        return count;
    }

    @Override
    public boolean updateClaimStatus(String customerPolicyId, String status) {
        if (purchaseRepository.findById(customerPolicyId).isPresent()) {
            CustomerInsurance customerInsurance = purchaseRepository.findById(customerPolicyId).get();
            int index = customerInsurance.getClaimStatus().size() - 1;
            System.out.println(index);
            System.out.println(customerInsurance.getClaimSum().size());
            List<String> claimStatus = customerInsurance.getClaimStatus();

            List<String> decisionDate = customerInsurance.getDecisionDate();
            String last = claimStatus.get(claimStatus.size() - 1);
            if (last.equalsIgnoreCase("pending")) {
                last = status;
                claimStatus.remove(claimStatus.size() - 1);
                claimStatus.add(last);
                java.util.Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                String date_decision = formatter.format(date);
                decisionDate.add(date_decision);
                customerInsurance.setClaimStatus(claimStatus);
                customerInsurance.setDecisionDate(decisionDate);
                DecisionDTO decisionDTO = new DecisionDTO();
                decisionDTO.setCustomerPolicyId(customerInsurance.getCustomerPolicyId());
                decisionDTO.setInsurancePolicyId(customerInsurance.getInsurancePolicyId());
                decisionDTO.setEmail(customerInsurance.getEmail());
                decisionDTO.setName(customerInsurance.getName());
                decisionDTO.setClaimAmount(customerInsurance.getClaimSum().get(index));
                decisionDTO.setClaimDate(customerInsurance.getClaimSubmissionDate().get(index));
                decisionDTO.setStatus(status);
                producer.sendMessageForDecision(decisionDTO);
                purchaseRepository.save(customerInsurance);

            }
            return true;
        }
        return false;
    }

    @Override
    public Insurance returnInsuranceForRenewal(Insurance insurance, String customerPolicyId) {
        System.out.println(insurance);
        CustomerInsurance customerInsurance;
        Insurance modifiedInsurance;
        List<String> startDate = new ArrayList<>();
        List<String> endDate = new ArrayList<>();

        if (purchaseRepository.findById(customerPolicyId).isPresent()) {
            customerInsurance = purchaseRepository.findById(customerPolicyId).get();
            modifiedInsurance = insurance;
            int lastIndex = customerInsurance.getEndDate().size() - 1;
            String policyEndDate = customerInsurance.getEndDate().get(lastIndex);
            long sum = customerInsurance.getSumInsured();
            List<PolicyDetails> policyDetails = new ArrayList<>();
            for (int i = 0; i < insurance.getPolicyDetails().length; i++) {
                if (insurance.getPolicyDetails()[i].getSumInsure() == sum) {

                    if (insurance.getInsuranceType().equalsIgnoreCase("LifeInsurance")) {
                        float factor = 1;
                        int count = 0;
                        String[] dis_lst = customerInsurance.getLifeInsurance().getHealthConditionList();
                        boolean[] ans = customerInsurance.getLifeInsurance().getQuestionnaireAnswers();
                        if (dis_lst.length > 2) {
                            factor = factor * 1.2f;
                        }
                        for (int k = 0; k < ans.length; k++) {
                            if (ans[k])
                                count++;
                        }
                        if (count > 2) {
                            factor = factor * 1.2f;
                        }
                        int oldPremium = insurance.getPolicyDetails()[i].getPremiums();
                        oldPremium = (int) (oldPremium * factor);
                        insurance.getPolicyDetails()[i].setPremiums(oldPremium);
                    }
                    policyDetails.add(insurance.getPolicyDetails()[i]);
                }
            }
            if (policyDetails.size() == 0) {
                return null;
            }

            if (!insurance.getInsuranceType().equalsIgnoreCase("HealthInsurance")) {
                PolicyDetails[] updatePolicyDetails = new PolicyDetails[policyDetails.size()];
                for (int i = 0; i < policyDetails.size(); i++) {
                    updatePolicyDetails[i] = policyDetails.get(i);
                }
                modifiedInsurance.setPolicyDetails(updatePolicyDetails);
                return modifiedInsurance;
            }

            // updating policy Details for Health Insurance
            List<InsuredInfo> usersInfo = new ArrayList<>();
            int user_no = customerInsurance.getHealthInsurance().getInsuredInfo().length;
            LocalDate today_date = LocalDate.now();
            LocalDate user_dob;
            for (int i = 0; i < user_no; i++) {
                usersInfo.add(customerInsurance.getHealthInsurance().getInsuredInfo()[i]);
            }
            InsuredInfo[] availableUsersInfo = customerInsurance.getHealthInsurance().getInsuredInfo();
            int age[] = new int[user_no];
            for (int i = 0; i < user_no; i++) {
                user_dob = LocalDate.parse(usersInfo.get(i).getInsuredDOB());
                age[i] = Period.between(user_dob, today_date).getYears();
                if (age[i] > 60) {
                    return null;
                }
            }
            int customPremium = 0;
            float bmi = 0;
            float bmiFactor = 1;
            float diseaseFactor = 1;
            int tempCost = 0;
            for (int j = 0; j < policyDetails.size(); j++) {
                customPremium = 0;
                bmiFactor = 1;
                diseaseFactor = 1;
                for (int k = 0; k < user_no; k++) {
                    bmiFactor = 1;
                    diseaseFactor = 1;
                    bmi = 10000 * usersInfo.get(k).getWeight()
                            / (usersInfo.get(k).getHeight() * usersInfo.get(k).getHeight());
                    if (bmi < 18.5f) {
                        bmiFactor = 1.05f;
                    } else if (bmi > 24 && bmi < 30f) {
                        bmiFactor = 1.1f;
                    } else {
                        bmiFactor = 1.2f;
                    }
                    if (usersInfo.get(k).getIllnessList() != null) {
                        if (usersInfo.get(k).getIllnessList().length <= 2) {
                            diseaseFactor = 1.1f;
                        } else if (usersInfo.get(k).getIllnessList().length >= 3) {
                            diseaseFactor = 1.2f;
                        }
                    }
                    if (age[k] < 20) {
                        tempCost = (int) (diseaseFactor * bmiFactor * policyDetails.get(j).getKids());
                        customPremium = customPremium + tempCost;
                    } else if (age[k] < 41) {
                        tempCost = (int) (diseaseFactor * bmiFactor * policyDetails.get(j).getAdults1());
                        customPremium = customPremium + tempCost;
                    } else if (age[k] < 51) {
                        tempCost = (int) (diseaseFactor * bmiFactor * policyDetails.get(j).getAdults2());
                        customPremium = customPremium + tempCost;
                    } else if (age[k] < 60) {
                        tempCost = (int) (diseaseFactor * bmiFactor * policyDetails.get(j).getAdults3());
                        customPremium = customPremium + tempCost;
                    }

                }
                policyDetails.get(j).setPremiums(customPremium);
            }
            PolicyDetails[] updatePolicyDetails = new PolicyDetails[policyDetails.size()];
            for (int i = 0; i < policyDetails.size(); i++) {
                updatePolicyDetails[i] = policyDetails.get(i);
            }
            modifiedInsurance.setPolicyDetails(updatePolicyDetails);
            return modifiedInsurance;
        }
        return null;
    }

    @Override
    public int startUp(String email) throws ParseException {
        if (purchaseRepository.getCustomerInsuranceByEmail(email).size() == 0) {
            System.out.println("Inside the error method");
            return 0;
        }
        List<CustomerInsurance> ci_list = purchaseRepository.getCustomerInsuranceByEmail(email);
        for (int k = 0; k < ci_list.size(); k++) {
            System.out.println(ci_list.get(k).getCustomerPolicyId());
        }
        CustomerInsurance customerInsurance = new CustomerInsurance();
        Date date = new Date();
        String currentDay = new SimpleDateFormat("yyyy-MM-dd").format(date);
        System.out.println(currentDay);
        boolean flag = true;
        for (int i = 0; i < ci_list.size(); i++) {
            flag = true;
            System.out.println("Inside the for loop with value of iteration " + i);
            customerInsurance = ci_list.get(i);
            // check for policy Validity
            if (customerInsurance.isStatus()) {
                System.out.println("Inside 341 line entering if policy is active with policy ID "
                        + customerInsurance.getCustomerPolicyId());
                String startDay = customerInsurance.getStartDate().get(0);
                String endDay = customerInsurance.getEndDate().get(customerInsurance.getEndDate().size() - 1);
                if (startDay.compareTo(currentDay) > 0 || endDay.compareTo(currentDay) < 0) {
                    customerInsurance.setStatus(false);
                    purchaseRepository.save(customerInsurance);
                }
                if (customerInsurance.getClaimDate().size() != 0) {
                    String lastClaimDate = customerInsurance.getClaimDate()
                            .get(customerInsurance.getClaimSubmissionDate().size() - 1);
                    String lastClaimStatus = customerInsurance.getClaimStatus()
                            .get(customerInsurance.getClaimStatus().size() - 1);
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Calendar cal = Calendar.getInstance();
                    System.out.println("Last claim status is :" + lastClaimStatus);
                    try {
                        cal.setTime(sdf.parse(lastClaimDate));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    cal.add(Calendar.DAY_OF_MONTH, 60);
                    String cutOffDate = sdf.format(cal.getTime());
                    System.out.println("Cuttoff date :" + cutOffDate);
                    if (cutOffDate.compareTo(currentDay) < 0) {
                        if (lastClaimStatus.equalsIgnoreCase("pending")) {
                            System.out.println("Entering with pending");
                            List<String> startD = customerInsurance.getStartDate();
                            List<String> endD = customerInsurance.getEndDate();
                            int resultIndex = -1;
                            for (int k = 0; k < startD.size(); k++) {
                                String startDate = startD.get(k);
                                String ourDate = lastClaimDate;
                                String endDate = endD.get(k);
                                if (startDate.compareTo(ourDate) < 0 && endDate.compareTo(ourDate) > 0) {
                                    resultIndex = k;
                                    break;
                                }
                            }
                            if (resultIndex == -1) {
                                List<String> updateStatus = customerInsurance.getClaimStatus();
                                updateStatus.remove(updateStatus.size() - 1);
                                updateStatus.add("rejected");
                                int index = customerInsurance.getClaimStatus().size() - 1;
                                DecisionDTO decisionDTO = new DecisionDTO();
                                decisionDTO.setCustomerPolicyId(customerInsurance.getCustomerPolicyId());
                                decisionDTO.setInsurancePolicyId(customerInsurance.getInsurancePolicyId());
                                decisionDTO.setEmail(customerInsurance.getEmail());
                                decisionDTO.setName(customerInsurance.getName());
                                decisionDTO.setClaimAmount(customerInsurance.getClaimSum().get(index));
                                decisionDTO.setClaimDate(customerInsurance.getClaimSubmissionDate().get(index));
                                decisionDTO.setStatus("rejected");
                                producer.sendMessageForDecision(decisionDTO);
                                customerInsurance.getDecisionDate().add(cutOffDate);
                                customerInsurance.setClaimStatus(updateStatus);
                                // customerInsurance.setClaimFlag(false);
                                purchaseRepository.save(customerInsurance);
                                continue;
                            }
                            System.out.println("Found a policy matching the date and lying between dates");
                            long totalClaim = 0;
                            // checking for if the insured sum is sufficient for claimed amount
                            for (int index = 0; index < customerInsurance.getClaimSum().size(); index++) {
                                if (customerInsurance.getStartDate().get(resultIndex)
                                        .compareTo(customerInsurance.getClaimDate().get(index)) < 0
                                        && customerInsurance.getEndDate().get(resultIndex)
                                                .compareTo(customerInsurance.getClaimDate().get(index)) > 0) {
                                    if (customerInsurance.getClaimStatus().get(index).equalsIgnoreCase("approved")) {
                                        totalClaim = totalClaim + customerInsurance.getClaimSum().get(index);
                                    }
                                }
                            }
                            System.out.println("Total claim till now:" + totalClaim);
                            if (totalClaim < customerInsurance.getSumInsured()) {
                                System.out.println(
                                        "Entering inside approving for id :" + customerInsurance.getCustomerPolicyId());
                                long sum = customerInsurance.getClaimSum()
                                        .get(customerInsurance.getClaimSum().size() - 1);
                                List<String> updateStatus = customerInsurance.getClaimStatus();
                                updateStatus.remove(updateStatus.size() - 1);

                                updateStatus.add("approved");
                                int index = customerInsurance.getClaimStatus().size() - 1;
                                DecisionDTO decisionDTO = new DecisionDTO();
                                decisionDTO.setCustomerPolicyId(customerInsurance.getCustomerPolicyId());
                                decisionDTO.setInsurancePolicyId(customerInsurance.getInsurancePolicyId());
                                decisionDTO.setEmail(customerInsurance.getEmail());
                                decisionDTO.setName(customerInsurance.getName());
                                decisionDTO.setClaimAmount(customerInsurance.getClaimSum().get(index));
                                decisionDTO.setClaimDate(customerInsurance.getClaimSubmissionDate().get(index));
                                decisionDTO.setStatus("approved");
                                producer.sendMessageForDecision(decisionDTO);
                                customerInsurance.getClaimSum().remove(customerInsurance.getClaimSum().size() - 1);
                                if ((totalClaim + sum) <= customerInsurance.getSumInsured()) {
                                    customerInsurance.getClaimSum().add(sum);
                                } else {
                                    customerInsurance.getClaimSum().add(customerInsurance.getSumInsured() - totalClaim);
                                }
                                customerInsurance.getDecisionDate().add(cutOffDate);
                                customerInsurance.setClaimStatus(updateStatus);
                                // customerInsurance.setClaimFlag(false);
                                purchaseRepository.save(customerInsurance);
                            } else {
                                List<String> updateStatus = customerInsurance.getClaimStatus();
                                updateStatus.remove(updateStatus.size() - 1);
                                updateStatus.add("rejected");
                                customerInsurance.getDecisionDate().add(cutOffDate);
                                customerInsurance.setClaimStatus(updateStatus);
                                // customerInsurance.setClaimFlag(false);
                                purchaseRepository.save(customerInsurance);

                            }

                        }
                    }

                }
            }
        }
        return 1;
    }

    public String checkRenewalStatus(String customerPolicyId, Insurance insurance)
            throws PolicyIdNotFoundException, ParseException {
        if (!purchaseRepository.findById(customerPolicyId).isPresent()) {
            return "Customer Policy Id not found";
        }

        CustomerInsurance customerInsurance = purchaseRepository.findById(customerPolicyId).get();
        List<String> endDayList = customerInsurance.getEndDate();
        Date date = new Date();
        String currentDay = new SimpleDateFormat("yyyy-MM-dd").format(date);
        System.out.println(currentDay);
        String startDay = endDayList.get(endDayList.size() - 1);
        if (currentDay.compareTo(startDay) > 0) {
            return "Policy has already expired";
        }
        String endDate = "";
        System.out.println(startDay);
        String sDay = customerInsurance.getStartDate().get(customerInsurance.getStartDate().size() - 1);
        String eDay = startDay;
        String ourDate = currentDay;
        System.out.println("Status of : " + (sDay.compareTo(ourDate) < 0 && eDay.compareTo(ourDate) > 0));

        if (!(sDay.compareTo(ourDate) < 0) || !(eDay.compareTo(ourDate) >= 0)) {
            System.out.println("Cannot renew now because of policy  time interval is not valid");
            return "No policy available to renew ";
        }
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c1 = Calendar.getInstance();
        c1.setTime(sdf1.parse(eDay));
        c1.add(Calendar.DATE, -60); // number of days to add
        String cutOffDate = sdf1.format(c1.getTime());
        System.out.println("Cut Off date for renewing insurance :  " + cutOffDate);
        System.out.println("Cut Off status : " + (cutOffDate.compareTo(ourDate) > 0));
        if (cutOffDate.compareTo(ourDate) >= 0) {
            System.out.println("Renew possible only before 60 days of policy expiry");
            return "Renew possible only before 60 days of policy expiry";
        }
        PurchaseServiceImplementation purchaseServiceImplementation=new PurchaseServiceImplementation();
        Insurance retrievedInsurance=returnInsuranceForRenewal(insurance,customerPolicyId);
        if(retrievedInsurance==null)
        {
            for(int i=0;i<insurance.getPolicyDetails().length;i++)
            {
                if(insurance.getPolicyDetails()[i].getSumInsure()==customerInsurance.getSumInsured())
                {
                    return "Age of all users in the policy covered should be less than 60 years ";
                }
            }
            return "Currently the policy cannot be renewed for " + customerInsurance.getSumInsured() + " amount";
        }

        return null;
    }

    @Override
    public int uploadDocument(MultipartFile documentFile, String policyId) throws IOException {

        CustomerInsurance retrieveInsurance = purchaseRepository.findById(policyId).get();
        if (retrieveInsurance == null)
            return 0;
        retrieveInsurance.getClaimDocument().add(documentFile.getBytes());
        CustomerInsurance insurance = purchaseRepository.save(retrieveInsurance);
        return 1;
    }

}
