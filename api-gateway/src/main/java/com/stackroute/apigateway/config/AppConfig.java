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
                        .path("/api/v2/**")
                        .uri("http://localhost:8080/"))
                .route(p -> p
                        .path("/api/v1/**")
                        .uri("http://localhost:8085/"))
                .route(p->p
                        .path("/api/vk1/**")
                        .uri("http://localhost:8010/"))
                .route(p -> p
                        .path("/api/**")
                        .uri("http://localhost:8084/"))
                .route(p -> p
                        .path("/Recommendation/**")
                        .uri("http://localhost:9999/"))
                .build();
    }
    @Bean
    public FilterRegistrationBean jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns("/api/v2/loginUser");

        return filterRegistrationBean;
    }

}
