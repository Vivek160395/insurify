package com.stackroute.userservice;

import com.stackroute.userservice.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

//	@Bean
//	FilterRegistrationBean jwtFilter(){
//		FilterRegistrationBean frb = new FilterRegistrationBean();
//		frb.setFilter(new JwtFilter());
////		frb.addUrlPatterns("/api/v1/**");
//		frb.addUrlPatterns("/api/v1/user/*");
//		return frb;
//	}

}
