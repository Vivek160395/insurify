package com.stackroute.apigateway.config;

import com.stackroute.apigateway.filter.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/api/v1/**")
                        .uri("lb://authentication-service"))
                .route(p->p
                        .path("/api/vk1/**")
                        .uri("lb://insurance-service"))
                .route(p -> p
                        .path("/api/**")
                        .uri("lb://soulmate-service"))
                .route(p -> p
                        .path("/Recommendation/**")
                        .uri("lb://recommendation-service"))
                .route(p -> p
                        .path("/api/v1/**")
                        .uri("lb://user-service"))
                .build();
    }
    @Bean
    public FilterRegistrationBean jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns("");
        return filterRegistrationBean;
    }
}
