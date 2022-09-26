package com.stackroute.purchaseinsuranceservice.service;

import com.stackroute.purchaseinsuranceservice.config.Producer;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class PurchaseServiceImplementation implements PurchaseService{
   @Autowired
   private PurchaseRepository purchaseRepository;

   @Autowired
    private Producer producer;

    @Override
    public CustomerInsurance savePurchasedInsurance(CustomerInsurancePurchase customerInsurancePurchase) throws PolicyIdAlreadyExistsException {
        PurchaseDTO purchaseDTO=new PurchaseDTO();
        if(purchaseRepository.findById(customerInsurancePurchase.getCustomerPolicyId()).isPresent())
        {
            throw new PolicyIdAlreadyExistsException();
        }
        else {
            CustomerInsurance ci=new CustomerInsurance();
            ci.setCustomerPolicyId(customerInsurancePurchase.getCustomerPolicyId());
            ci.setInsurancePolicyId(customerInsurancePurchase.getInsurancePolicyId());
            ci.setPolicyType(customerInsurancePurchase.getPolicyType());
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

            purchaseDTO.setCustomerPolicyId(customerInsurancePurchase.getCustomerPolicyId());
            purchaseDTO.setInsurancePolicyId(customerInsurancePurchase.getInsurancePolicyId());
            purchaseDTO.setEmail(customerInsurancePurchase.getEmail());
            purchaseDTO.setName(customerInsurancePurchase.getName());
            purchaseDTO.setPolicyType(customerInsurancePurchase.getPolicyType());
            purchaseDTO.setSumInsured(customerInsurancePurchase.getSumInsured());
            purchaseDTO.setPurchaseDate(customerInsurancePurchase.getPurchaseDate());
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
    public  Iterable<CustomerInsurance> getInsuranceByEmail(String email) throws NoInsuranceFoundException {
        Iterable<CustomerInsurance> customerInsurances;

           customerInsurances = purchaseRepository.getCustomerInsuranceByEmail(email);


       if(customerInsurances==null){
           throw new NoInsuranceFoundException();
       }
        System.out.println(customerInsurances);
            return  customerInsurances;
    }

    @Override
    public boolean checkIfAlreadyPurchased(String email,String insurancePolicyId) {
        List<CustomerInsurance> customerInsurances=new ArrayList<>();
                purchaseRepository.getPurchasedInsuranceByEmail(email).forEach(customerInsurances::add);
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
        RenewDTO renewDTO=new RenewDTO();
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
        c1.add(Calendar.DATE, -60);  // number of days to add
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

        renewDTO.setCustomerPolicyId(customerInsurance.getCustomerPolicyId());
        renewDTO.setInsurancePolicyId(customerInsurance.getInsurancePolicyId());
        renewDTO.setPolicyType(customerInsurance.getPolicyType());
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
        ClaimDTO claimDTO=new ClaimDTO();
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
        claimDTO.setBalance(ci.getSumInsured()-totalClaim);
        if((totalClaim+customerClaim.getClaimAmount())>ci.getSumInsured())
        {
            long partialClaim=ci.getSumInsured()-totalClaim;
            ci.getClaimSum().add(partialClaim);
            ci.getClaimDate().add(customerClaim.getClaimDate());
            ci.getClaimStatus().add("pending");
            purchaseRepository.save(ci);
            claimDTO.setStatus("Partial Claim");
            producer.sendMessageForClaim(claimDTO);
            System.out.println("Total claim amount:"+totalClaim+customerClaim.getClaimAmount()+"/n Sum"+ci.getSumInsured());
            return "Your partial claim of "+partialClaim+" is submitted to Insurer because of crossing insured amount limit in the policy";
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
        if(!purchaseRepository.findById(customerPolicyId).isPresent())
        {
            throw new PolicyIdNotFoundException();
        }
         CustomerInsurance customer_insurance=purchaseRepository.findById(customerPolicyId).get();
        return customer_insurance;
    }

    @Override
    public int startUp(String email) throws ParseException {
           if(purchaseRepository.getCustomerInsuranceByEmail(email).size()==0)
             {
                return 0 ;
              }
        List<CustomerInsurance> ci_list=purchaseRepository.getCustomerInsuranceByEmail(email);
        CustomerInsurance customerInsurance=new CustomerInsurance();
        Date date = new Date();
        String currentDay= new SimpleDateFormat("yyyy-MM-dd").format(date);
        System.out.println(currentDay);
        boolean flag=true;
        for(int i=0;i<ci_list.size();i++)
      {
          flag=true;
        customerInsurance=ci_list.get(i);
        //check for policy Validity
         if(!customerInsurance.isStatus()) {
             String startDay = customerInsurance.getStartDate().get(0);
             String endDay = customerInsurance.getEndDate().get(customerInsurance.getEndDate().size() - 1);
             if (startDay.compareTo(currentDay) > 0 || endDay.compareTo(currentDay) < 0) {
                 if (customerInsurance.getPolicyType().equalsIgnoreCase("Life Insurance"))
                     customerInsurance.setClaimFlag(true);
                 else
                     customerInsurance.setClaimFlag(false);


                 customerInsurance.setStatus(false);
                 customerInsurance.setRenewFlag(false);
                 purchaseRepository.save(customerInsurance);
             }
             if(customerInsurance.getClaimDate().size()!=0)
             {
              String lastClaimDate=customerInsurance.getClaimDate().get(customerInsurance.getClaimDate().size()-1);
              String lastClaimStatus=customerInsurance.getClaimStatus().get(customerInsurance.getClaimStatus().size()-1);
                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                 //create instance of the Calendar class and set the date to the given date
                 Calendar cal = Calendar.getInstance();
                 try{
                     cal.setTime(sdf.parse(lastClaimDate));
                 }catch(ParseException e){
                     e.printStackTrace();
                 }
                 cal.add(Calendar.DAY_OF_MONTH, 60);
                 String cutOffDate = sdf.format(cal.getTime());
                 if(cutOffDate.compareTo(currentDay)<0)
                 {
                  if(lastClaimStatus.equalsIgnoreCase("pending"))
                  {
                      List<String> startD=customerInsurance.getStartDate();
                      List<String> endD=customerInsurance.getEndDate();
                      int resultIndex=-1;
                      for(int k=0;k<startD.size();k++)
                      {
                          String startDate=startD.get(k);
                          String ourDate=lastClaimDate;
                          String endDate=endD.get(k);
                          if(startDate.compareTo(ourDate)<0&&endDate.compareTo(ourDate)>0)
                          {
                              resultIndex=k;
                              break;
                          }
                      }
                      if(resultIndex==-1)
                      {
                          List<String> updateStatus=customerInsurance.getClaimStatus();
                          updateStatus.remove(updateStatus.size()-1);
                          updateStatus.add("rejected");
                          customerInsurance.getDecisionDate().add(cutOffDate);
                          customerInsurance.setClaimStatus(updateStatus);
//                          customerInsurance.setClaimFlag(false);
                          purchaseRepository.save(customerInsurance);
                          continue;
                      }
                      long totalClaim=0;
                      //checking for if the insured sum is sufficient for claimed amount
                      for (int index = 0; index <customerInsurance.getClaimSum().size() ; index++) {
                          if(customerInsurance.getStartDate().get(resultIndex).compareTo(customerInsurance.getClaimDate().get(index))<0&&customerInsurance.getEndDate().get(resultIndex).compareTo(customerInsurance.getClaimDate().get(index))>0)
                          {
                              if(customerInsurance.getClaimStatus().get(i).equalsIgnoreCase("approved"))
                              {
                                  totalClaim = totalClaim + customerInsurance.getClaimSum().get(index);
                              }
                          }
                      }

                      if(totalClaim<customerInsurance.getSumInsured())
                      {
                          long sum=customerInsurance.getClaimSum().get(customerInsurance.getClaimSum().size()-1);
                          List<String> updateStatus=customerInsurance.getClaimStatus();
                          updateStatus.remove(updateStatus.size()-1);
                          updateStatus.add("approved");
                          customerInsurance.getClaimSum().remove(customerInsurance.getClaimSum().size()-1);
                          if((totalClaim+sum)<=customerInsurance.getSumInsured())
                          {
                              customerInsurance.getClaimSum().add(sum);
                          }
                          else
                          {
                              customerInsurance.getClaimSum().add(customerInsurance.getSumInsured()-totalClaim);
                          }
                          customerInsurance.getDecisionDate().add(cutOffDate);
                          customerInsurance.setClaimStatus(updateStatus);
//                          customerInsurance.setClaimFlag(false);
                          purchaseRepository.save(customerInsurance);
                      }
                      else
                      {
                          List<String> updateStatus=customerInsurance.getClaimStatus();
                          updateStatus.remove(updateStatus.size()-1);
                          updateStatus.add("rejected");
                          customerInsurance.getDecisionDate().add(cutOffDate);
                          customerInsurance.setClaimStatus(updateStatus);
//                          customerInsurance.setClaimFlag(false);
                          purchaseRepository.save(customerInsurance);
                          continue;
                      }

                  }
                 }

             }
         }
      }
  return 1;
    }


@Override
public int uploadDocument(MultipartFile documentFile,String policyId) throws IOException {

        CustomerInsurance retrieveInsurance = purchaseRepository.findById(policyId).get();

        if(retrieveInsurance==null)
            return 0;
        retrieveInsurance.getClaimDocument().add(documentFile.getBytes());
        CustomerInsurance insurance = purchaseRepository.save(retrieveInsurance);
      return 1;
    }
}
