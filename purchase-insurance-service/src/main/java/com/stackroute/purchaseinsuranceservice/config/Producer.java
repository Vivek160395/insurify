package com.stackroute.purchaseinsuranceservice.config;

import com.stackroute.purchaseinsuranceservice.model.ClaimDTO;
import com.stackroute.purchaseinsuranceservice.model.CustomerInsurance;
import com.stackroute.purchaseinsuranceservice.model.PurchaseDTO;
import com.stackroute.purchaseinsuranceservice.model.RenewDTO;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private DirectExchange directExchange;

    public void sendMessageToRabbitMq(CustomerInsurance customerInsurance){
        rabbitTemplate.convertAndSend(directExchange.getName(),"recommendation_routing",customerInsurance);
    }
    public void sendMessageForPurchase(PurchaseDTO purchaseDTO){
        rabbitTemplate.convertAndSend(directExchange.getName(),"purchase_routing",purchaseDTO);
    }
    public void sendMessageForRenew(RenewDTO renewDTO){
        rabbitTemplate.convertAndSend(directExchange.getName(),"renew_routing",renewDTO);
    }
    public void sendMessageForClaim(ClaimDTO claimDTO){
        rabbitTemplate.convertAndSend(directExchange.getName(),"claim_routing",claimDTO);
    }
}
