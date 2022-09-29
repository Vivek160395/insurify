package com.stackroute.emailservice.rabbitmq2;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {

    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange("recommendation_exchange");
    }

    @Bean
    public Queue purchaseQueue(){
        return new Queue("purchase_queue");
    }
    @Bean
    public Queue claimQueue(){
        return new Queue("claim_queue");
    }
    @Bean
    public Queue renewQueue(){
        return new Queue("renew_queue");
    }

    @Bean
    public Binding purchase_binding(Queue purchaseQueue, DirectExchange directExchange){
        return BindingBuilder.bind(purchaseQueue).to(directExchange).with("purchase_routing");
    }
    @Bean
    public Binding renew_binding(Queue renewQueue, DirectExchange directExchange){
        return BindingBuilder.bind(renewQueue).to(directExchange).with("renew_routing");
    }
    @Bean
    public Binding claim_binding(Queue claimQueue, DirectExchange directExchange){
        return BindingBuilder.bind(claimQueue).to(directExchange).with("claim_routing");
    }
    // Json converter that uses Json2 library
    @Bean
    public Jackson2JsonMessageConverter producerJackson2JsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory)
    {
        RabbitTemplate rabbitTemp=new RabbitTemplate(connectionFactory);
        rabbitTemp.setMessageConverter(producerJackson2JsonMessageConverter());
        return  rabbitTemp;

    }

}
