package com.stackroute.authentication.service.repository;


import com.stackroute.authentication.service.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserCredentialsRepository extends JpaRepository<UserCredentials, String> {
    UserCredentials findByEmailIdAndPassword(String emailId, String password);

}
