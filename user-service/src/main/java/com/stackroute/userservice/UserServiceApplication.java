package com.stackroute.userservice;

import com.stackroute.userservice.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//@EnableSwagger2
@SpringBootApplication
public class UserServiceApplication {


	public static void main(String[] args) {SpringApplication.run(UserServiceApplication.class, args);
	}


  // @Bean
  // FilterRegistrationBean jwtFilter(){
  // FilterRegistrationBean frb = new FilterRegistrationBean();
  // frb.setFilter(new JwtFilter());
  //
  //// frb.addUrlPatterns("/api/v1/user/*");
  //
  // frb.addUrlPatterns("/api/v1/updateUser/*");
  // frb.addUrlPatterns("/api/v1/removeUser/*");
  // return frb;
  // }

  // @Bean
  // public FilterRegistrationBean filterRegistrationBean() {
  // final CorsConfiguration config = new CorsConfiguration();
  // config.setAllowCredentials(true);
  // // config.addAllowedOrigin("");
  // // config.addAllowedHeader("*");
  // // config.addAllowedMethod("*");


//	@Bean
//	public FilterRegistrationBean filterRegistrationBean(){
//		final CorsConfiguration config= new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOrigin("http://localhost:4200");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("*");
//
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//		return bean;
//	}

  // final UrlBasedCorsConfigurationSource source = new
  // UrlBasedCorsConfigurationSource();
  // source.registerCorsConfiguration("/**", config);
  // FilterRegistrationBean bean = new FilterRegistrationBean(new
  // CorsFilter(source));
  // bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
  // return bean;
  // }


}
