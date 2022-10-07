// package com.stackroute.policyadvisorservice.config;

// import org.springframework.amqp.core.Binding;
// import org.springframework.amqp.core.BindingBuilder;
// import org.springframework.amqp.core.DirectExchange;
// import org.springframework.amqp.core.ExchangeBuilder;
// import org.springframework.amqp.rabbit.annotation.Exchange;
// import org.springframework.amqp.core.Queue;
// import org.springframework.amqp.rabbit.connection.ConnectionFactory;
// import org.springframework.amqp.rabbit.core.RabbitTemplate;
// import
// org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class MessageConfiguration {

// @Bean
// public DirectExchange directExchange() {
// return new DirectExchange("insurify-user1");
// }

// @Bean
// public Queue authQueue() {
// return new Queue("queue9");
// }

// @Bean
// public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
// return new Jackson2JsonMessageConverter();
// }

// @Bean
// public Binding PolicyAdvisorBinding(DirectExchange directExchange) {
// return BindingBuilder
// .bind(authQueue())
// .to(directExchange)
// .with("routing9");
// }

// @Bean
// public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
// RabbitTemplate rabbitTemp = new RabbitTemplate(connectionFactory);
// rabbitTemp.setMessageConverter(jackson2JsonMessageConverter());
// return rabbitTemp;
// }

// }
