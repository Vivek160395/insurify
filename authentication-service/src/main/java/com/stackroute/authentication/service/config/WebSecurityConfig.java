package com.stackroute.authentication.service.config;




import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http.antMatcher("/oauth2/authorization/google").authorizeRequests()
               .antMatchers("/").permitAll()
               .anyRequest().authenticated()
               .and()
               .oauth2Login();
//        http.csrf().disable().authorizeRequests().antMatchers("/oauth2/authorization/google").permitAll().anyRequest().authenticated().and().oauth2Login();

    }


}
