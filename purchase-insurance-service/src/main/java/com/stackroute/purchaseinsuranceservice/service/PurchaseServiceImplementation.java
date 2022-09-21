package com.stackroute.purchaseinsuranceservice.service;

import com.stackroute.purchaseinsuranceservice.config.Producer;
import com.stackroute.purchaseinsuranceservice.exception.PolicyExpiredException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdAlreadyExistsException;
import com.stackroute.purchaseinsuranceservice.exception.PolicyIdNotFoundException;
import com.stackroute.purchaseinsuranceservice.model.CustomerClaim;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurancePurchase;
import com.stackroute.purchaseinsuranceservice.model.CustomerRenewal;
import com.stackroute.purchaseinsuranceservice.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Service
public class PurchaseServiceImplementation implements PurchaseService{
   @Autowired
   private PurchaseRepository purchaseRepository;

   @Autowired
    private Producer producer;

    @Override
    public CustomerInsurance savePurchasedInsurance(CustomerInsurancePurchase customerInsurancePurchase) throws PolicyIdAlreadyExistsException {
        if(purchaseRepository.findById(customerInsurancePurchase.getCustomerPolicyId()).isPresent())
        {
            throw new PolicyIdAlreadyExistsException();
        }
        else {
            CustomerInsurance ci=new CustomerInsurance();
            ci.setCustomerPolicyId(customerInsurancePurchase.getCustomerPolicyId());
            ci.setInsurancePolicyId(customerInsurancePurchase.getInsurancePolicyId());
            ci.setEmail(customerInsurancePurchase.getEmail());
            ci.setSumInsured(customerInsurancePurchase.getSumInsured());
            ci.getStartDate().add(customerInsurancePurchase.getStartDate());
            ci.getEndDate().add(customerInsurancePurchase.getEndDate());
            ci.getPremium().add(customerInsurancePurchase.getPremium());
            ci.getPurchaseDate().add(customerInsurancePurchase.getPurchaseDate());
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
            return purchaseRepository.save(ci);
        }
    }

    @Override
    public Iterable<CustomerInsurance> getCustomerInsurances() {
        return purchaseRepository.findAll();
    }

    @Override
    public CustomerInsurance getPolicyDetailsByCustomerPolicyID(String customerPolicyId) throws PolicyIdNotFoundException {
        if(!purchaseRepository.findById(customerPolicyId).isPresent())
        {
            throw new PolicyIdNotFoundException();
        }
        else
        {
            return purchaseRepository.findById(customerPolicyId).get();
        }
    }

    @Override
    public List<CustomerInsurance> getInsuranceByEmail(String email) {
        List<CustomerInsurance> customerInsurances=purchaseRepository.getPurchasedInsuranceByEmail(email);
        if(customerInsurances.size()==0)
        {
            return null;
        }
        else
            return customerInsurances;
    }

    @Override
    public boolean checkIfAlreadyPurchased(String email,String insurancePolicyId) {
        List<CustomerInsurance> customerInsurances=purchaseRepository.getPurchasedInsuranceByEmail(email);
        CustomerInsurance customerInsurance;

            for(int i=0;i<customerInsurances.size();i++)
            {
                System.out.println("Inside the customerInsurances list");

                customerInsurance=customerInsurances.get(i);
                System.out.println(customerInsurance.getInsurancePolicyId());
                if(customerInsurance.getInsurancePolicyId().equalsIgnoreCase(insurancePolicyId))
                {
                    System.out.println("Already purchased the insurance");
                    return false;
                }
            }
            return true;

    }

    @Override
    public boolean renewCustomerPolicy(CustomerRenewal customerRenewal) throws PolicyIdNotFoundException, ParseException, PolicyExpiredException {
        if(!purchaseRepository.findById(customerRenewal.getCustomerPolicyId()).isPresent())
        {
            throw new PolicyIdNotFoundException();
        }
        CustomerInsurance customerInsurance=purchaseRepository.findById(customerRenewal.getCustomerPolicyId()).get();
        List<String> endDayList=customerInsurance.getEndDate();

        String startDay=endDayList.get(endDayList.size()-1);
        if(customerRenewal.getDate().compareTo(startDay)>0)
        {
            throw new PolicyExpiredException();
        }
        String endDate="";
        System.out.println(startDay);
         String sDay=customerInsurance.getStartDate().get(customerInsurance.getStartDate().size()-1);
         String eDay=startDay;
         String ourDate= customerRenewal.getDate();
        System.out.println("Status of : "+(sDay.compareTo(ourDate)<0&&eDay.compareTo(ourDate)>0));

         if(!(sDay.compareTo(ourDate)<0)||!(eDay.compareTo(ourDate)>=0))
         {
             System.out.println("Cannot renew now because of policy  time interval is not valid");
             return false;
         }
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c1 = Calendar.getInstance();
        c1.setTime(sdf1.parse(eDay));
        c1.add(Calendar.DATE, -31);  // number of days to add
       String cutOffDate = sdf1.format(c1.getTime());
        System.out.println("Cut Off date for renewing insurance :  "+cutOffDate);
        System.out.println("Cut Off status : "+(cutOffDate.compareTo(ourDate)>0));
        if(cutOffDate.compareTo(ourDate)>=0)
        {
            System.out.println("Renew possible only before 30 days of policy expiry");
            return false;
        }


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(sdf.parse(startDay));
        c.add(Calendar.DATE, 1);  // number of days to add
        startDay = sdf.format(c.getTime());
        System.out.println("Policy renewal starts from"+startDay);
        c.add(Calendar.YEAR,customerRenewal.getDuration());
        c.add(Calendar.DATE, -1);
        endDate=sdf.format(c.getTime());
        System.out.println("Policy Ends on "+endDate);
        customerInsurance.getStartDate().add(startDay);
        customerInsurance.getEndDate().add(endDate);
        customerInsurance.getPremium().add(customerRenewal.getPremium());
        customerInsurance.getAddOnName().add(customerRenewal.getAddOnName());
        customerInsurance.getPurchaseDate().add(customerRenewal.getDate());
        customerInsurance.getDuration().add(customerRenewal.getDuration());
        customerInsurance.setRenewalStatus(true);
        purchaseRepository.save(customerInsurance);
        return true;
    }
    @Override
    public String claimInsurance(CustomerClaim customerClaim) throws PolicyIdNotFoundException {
        if(!purchaseRepository.findById(customerClaim.getCustomerPolicyId()).isPresent())
        {
            throw new PolicyIdNotFoundException();
        }

        CustomerInsurance ci=purchaseRepository.findById(customerClaim.getCustomerPolicyId()).get();
        if(!ci.getEmail().equalsIgnoreCase(customerClaim.getEmail()))
        {
            throw new PolicyIdNotFoundException();
        }
        if((ci.getClaimStatus().size()!=0))
        {
            String lastClaimStatus=ci.getClaimStatus().get(ci.getClaimStatus().size()-1);
            if(lastClaimStatus.equalsIgnoreCase("pending"))
            {
                return "Previous Claims are pending.Wait for the older claims to settle in order to claim new one";
            }
        }
        //check for policy in given date
        List<String> startD=ci.getStartDate();
        List<String> endD=ci.getEndDate();
        int resultIndex=-1;
        for(int k=0;k<startD.size();k++)
        {
            String startDate=startD.get(k);
            String ourDate=customerClaim.getClaimDate();
            String endDate=endD.get(k);
            if(startDate.compareTo(ourDate)<0&&endDate.compareTo(ourDate)>0)
            {
                resultIndex=k;
                break;
            }
        }
        if(resultIndex==-1)
        {
            ci.setStatus(false);
            return "No active Policy to claim";
        }
        long totalClaim=0;
        //checking for if the insured sum is sufficient for claimed amount
        for (int i = 0; i <ci.getClaimSum().size() ; i++) {
            if(ci.getStartDate().get(resultIndex).compareTo(ci.getClaimDate().get(i))<0&&ci.getEndDate().get(resultIndex).compareTo(ci.getClaimDate().get(i))>0)
            {
                if(ci.getClaimStatus().get(i).equalsIgnoreCase("approved"))
                {
                    totalClaim = totalClaim + ci.getClaimSum().get(i);
                }
            }
        }
        if(totalClaim>=ci.getSumInsured())
        {
            ci.setStatus(false);
            return "Insured amount has been Exhausted.Purchase a new Policy to avail Benefits";
        }
        if((totalClaim+customerClaim.getClaimAmount())>ci.getSumInsured())
        {
            long partialClaim=ci.getSumInsured()-totalClaim;
            ci.getClaimSum().add(partialClaim);
            ci.getClaimDate().add(customerClaim.getClaimDate());
            ci.getClaimStatus().add("pending");
            purchaseRepository.save(ci);
            System.out.println("Total claim amount:"+totalClaim+customerClaim.getClaimAmount()+"/n Sum"+ci.getSumInsured());
            return "Your partial claim of "+partialClaim+" is submitted to Insurer because of crossing insured amount limit in the policy";
        }

        ci.getClaimSum().add(customerClaim.getClaimAmount());
        ci.getClaimDate().add(customerClaim.getClaimDate());
        ci.getClaimStatus().add("pending");
        purchaseRepository.save(ci);
        return "Your claim is submitted to the Insurer";
    }

     @Override
    public CustomerInsurance returnUserPolicyInformation(String customerPolicyId) throws PolicyIdNotFoundException {
        if(!purchaseRepository.findById(customerPolicyId).isPresent())
        {
            throw new PolicyIdNotFoundException();
        }
         CustomerInsurance customer_insurance=purchaseRepository.findById(customerPolicyId).get();
        return customer_insurance;
    }
}
