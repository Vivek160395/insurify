package com.stackroute.emailservice.rabbitmq2;

import com.stackroute.emailservice.model.*;
import com.stackroute.emailservice.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    private EmailService emailService;

    @Autowired
    public Consumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = "purchase_queue")
    public void getDataAndSendPurchaseEmail(PurchaseDTO purchaseDTO){
        Purchase purchase = new Purchase();
        Email email = new Email();
        purchase.setCustomerPolicyId(purchaseDTO.getCustomerPolicyId());
        purchase.setInsurancePolicyId(purchaseDTO.getInsurancePolicyId());
//        purchase.setPolicyType(purchaseDTO.getPolicyType());
        purchase.setEmail(purchaseDTO.getEmail());
        purchase.setSumInsured(purchaseDTO.getSumInsured());
        purchase.setStartDate(purchaseDTO.getStartDate());
//        purchase.setPurchaseDate(purchaseDTO.getPurchaseDate());
        purchase.setEndDate(purchaseDTO.getEndDate());
        purchase.setDuration(purchaseDTO.getDuration());
        purchase.setAddOnName(purchaseDTO.getAddOnName());
        purchase.setPremium(purchaseDTO.getPremium());
        purchase.setName(purchaseDTO.getName());

        email.setEmail(purchaseDTO.getEmail());
        email.setSubject("Insurance Purchased");
        String addon = "";
        String[] addonlist=purchase.getAddOnName();
        for(int i=0;i<purchase.getAddOnName().length;i++)
        {
            addon=addon+addonlist[i]+",";
        }
        if(addon.length()==0)
        {
            addon="No addon's purchased";
        }
        email.setBody("Hi,"+" "+purchase.getName()+"\n"+
                       "Thank you for Purchasing Insurance from INSURIFY.\n"+
                       "Please check the details below : \n"+
                       "CustomerPolicyId  :\t"+purchase.getCustomerPolicyId()+".\n"+"InsurancePolicyId :\t"+purchase.getInsurancePolicyId()+".\n"+"Sum Insured       :\t"+purchase.getSumInsured()+".\n"+"Start Date        :\t"+purchase.getStartDate()+".\n"+"End Date          :\t"+purchase.getEndDate()+".\n"+"Duration          :\t"+purchase.getDuration()+".\n"+"AddOnName         :\t"+addon+".\n"+"Premium           :\t"+purchase.getPremium()+".\n"+"Have a nice day");

        emailService.sendEmail(email);
    }


    @RabbitListener(queues = "claim_queue")
    public void getDataAndSendClaimEmail(ClaimDTO claimDTO){
        Claim claim = new Claim();
        Email email = new Email();
        claim.setCustomerPolicyId(claimDTO.getCustomerPolicyId());
        claim.setInsurancePolicyId(claimDTO.getInsurancePolicyId());
        claim.setEmail(claimDTO.getEmail());
        claim.setName(claimDTO.getName());
        claim.setClaimAmount(claimDTO.getClaimAmount());
        claim.setClaimDate(claimDTO.getClaimDate());
        claim.setClaimType(claimDTO.getClaimType());
        claim.setStartDate(claimDTO.getStartDate());
        claim.setEndDate(claimDTO.getEndDate());
        claim.setDuration(claimDTO.getDuration());
        claim.setBalance(claimDTO.getBalance());
        claim.setStatus(claimDTO.getStatus());

        email.setEmail(claimDTO.getEmail());
        email.setSubject("Claiming Insurance");
        email.setBody("Hi,"+" "+claim.getName()+"\n"+
                "Thank you for Claiming Insurance from INSURIFY. We will notify you when it is approved.\n"+
                "Please check the details below : \n"+
                "CustomerPolicyId  :\t"+claim.getCustomerPolicyId()+".\n"+"InsurancePolicyId  :\t"+claim.getInsurancePolicyId()+".\n"+"Claim Amount        :\t"+claim.getClaimAmount()+".\n"+"Claim Date           :\t"+claim.getClaimDate()+".\n"+"Claim Type            :\t"+claim.getClaimType()+".\n"+"Start Date             :\t"+claim.getStartDate()+".\n"+"End Date                :\t"+claim.getEndDate()+".\n"+"Duration               :\t"+claim.getDuration()+".\n"+"Balance                 :\t"+claim.getBalance()+".\n"+"Status                  :\t"+claim.getStatus()+".\n"+"Have a nice day");
        emailService.sendEmail(email);

    }

    @RabbitListener(queues = "renew_queue")
    public void getDataAndSendRenewEmail(RenewDTO renewDTO){
        Renew renew = new Renew();
        Email email = new Email();
        renew.setCustomerPolicyId(renewDTO.getCustomerPolicyId());
        renew.setInsurancePolicyId(renewDTO.getInsurancePolicyId());
//        renew.setPolicyType(renewDTO.getPolicyType());
        renew.setEmail(renewDTO.getEmail());
        renew.setSumInsured(renewDTO.getSumInsured());
        renew.setStartDate(renewDTO.getStartDate());
//        renew.setPurchaseDate(renewDTO.getPurchaseDate());
        renew.setEndDate(renewDTO.getEndDate());
        renew.setDuration(renewDTO.getDuration());
        renew.setAddOnName(renewDTO.getAddOnName());
        renew.setPremium(renewDTO.getPremium());
        renew.setName(renewDTO.getName());
        String addon = "";
        String[] addonlist=renewDTO.getAddOnName();
        for(int i=0;i<renewDTO.getAddOnName().length;i++)
        {
            addon=addon+addonlist[i]+",";
        }
        if(addon.length()==0)
        {
            addon="No addon's purchased";
        }


        email.setEmail(renewDTO.getEmail());
        email.setSubject("Renewing Insurance");
        email.setBody("Hi,"+" "+renew.getName()+"\n"+
                "Thank you for Renewing Insurance from INSURIFY.\n"+
                "Please check the details below : \n"+"CustomerPolicyId  :\t"+renew.getCustomerPolicyId()+".\n"+"InsurancePolicyId :\t"+renew.getInsurancePolicyId()+".\n"+"Sum Insured       :\t"+renew.getSumInsured()+".\n"+"Start Date        :\t"+renew.getStartDate()+".\n"+"Purchase Date     :\t"+renew.getPurchaseDate()+".\n"+"End Date          :\t"+renew.getEndDate()+".\n"+"Duration          :\t"+renew.getDuration()+".\n"+"AddOnName         :\t"+addon+".\n"+"Premium           :\t"+renew.getPremium()+".\n"+"Have a nice day");

        emailService.sendEmail(email);
    }

    @RabbitListener(queues = "decision_queue")
    public void getDataAndSendDecisionEmail(DecisionDTO decisionDTO){
        Decision decision = new Decision();
        Email email = new Email();
        decision.setCustomerPolicyId(decisionDTO.getCustomerPolicyId());
        decision.setInsurancePolicyId(decisionDTO.getInsurancePolicyId());
        decision.setEmail(decisionDTO.getEmail());
        decision.setName(decisionDTO.getName());
        decision.setClaimAmount(decisionDTO.getClaimAmount());
        decision.setClaimDate(decisionDTO.getClaimDate());
        decision.setStatus(decisionDTO.getStatus());

        email.setEmail(decisionDTO.getEmail());
        email.setSubject("Claiming Insurance is Successfull");
        email.setBody("Hi,"+" "+decision.getName()+"\n"+
                "Thank you for Claiming Insurance from INSURIFY.\n"+
                "Please check the details below : \n"+
                "CustomerPolicyId  :\t"+decision.getCustomerPolicyId()+".\n"+"InsurancePolicyId :\t"+decision.getInsurancePolicyId()+".\n"+"Claim Amount      :\t"+decision.getClaimAmount()+".\n"+"Claim Date        :\t"+decision.getClaimDate()+".\n"+"Status            :\t"+decision.getStatus()+".\n"+"Have a nice day");

        emailService.sendEmail(email);

    }


}
