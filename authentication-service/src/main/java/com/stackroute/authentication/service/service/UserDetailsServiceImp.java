//package com.stackroute.authentication.service.service;
//
//import com.stackroute.authentication.service.model.UserCredentials;
//import com.stackroute.authentication.service.repository.UserCredentialsRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//public class UserDetailsServiceImp implements UserDetailsService {
//    @Autowired
//    private UserCredentialsRepository userCredentialsRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String emailId)
//            throws UsernameNotFoundException {
//        UserCredentials userCredentials = userCredentialsRepository.getUserByEmailId(emailId);
//
//        if (userCredentials == null) {
//            throw new UsernameNotFoundException("Could not find user");
//        }
//
//        return new MyUserDetails(userCredentials);
//    }
//}
