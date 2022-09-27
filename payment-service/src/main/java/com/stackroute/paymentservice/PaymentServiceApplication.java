package com.stackroute.paymentservice;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class PaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

//	@Bean
//	 public FilterRegistrationBean filterRegistrationBean() {
//	 final CorsConfiguration config = new CorsConfiguration();
//	 config.setAllowCredentials(true);
//	  config.addAllowedOrigin("");
//	  config.addAllowedHeader("*");
//	  config.addAllowedMethod("*");
//
//	 final UrlBasedCorsConfigurationSource source = new
//	 UrlBasedCorsConfigurationSource();
//	 source.registerCorsConfiguration("/**", config);
//	 FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//	 bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//	 return bean;
//	 }

}
