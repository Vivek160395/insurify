package com.stackroute.insuranceservice.config;

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
    public DirectExchange directExchange() {
        return new DirectExchange("insurance_Exchange");
    }

    @Bean
    public Queue queue() {
        return new Queue("queue_6");
    }

    @Bean
    Queue purchaseRenewQueue() {
        return new Queue("purchaseRenewQueue");
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding customerBinding(Queue queue, DirectExchange directExchange) {
        return BindingBuilder.bind(queue).to(directExchange).with("Nehitha");
    }

    @Bean
    public Binding purchaseRenewQueueBinding(Queue purchaseRenewQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(purchaseRenewQueue).to(directExchange).with("renewPurchaseQueueKey");
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}
