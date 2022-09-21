package com.stackroute.insuranceservice;

// import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.context.annotation.Bean;
// import org.springframework.core.Ordered;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class InsuranceServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsuranceServiceApplication.class, args);
	}

	// @Bean
	// public FilterRegistrationBean filterRegistrationBean() {
	// final CorsConfiguration config = new CorsConfiguration();
	// config.setAllowCredentials(true);
	// config.addAllowedOrigin("http://localhost:4200");
	// config.addAllowedHeader("*");
	// config.addAllowedMethod("*");

	// final UrlBasedCorsConfigurationSource source = new
	// UrlBasedCorsConfigurationSource();
	// source.registerCorsConfiguration("/**", config);
	// FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter());
	// bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
	// return bean;
	// }
}
