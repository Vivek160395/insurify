package com.stackroute.authentication.service.repository;


import com.stackroute.authentication.service.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, String> {
    UserCredentials findByEmailIdAndPassword(String emailId, String password);
    @Query("SELECT u FROM UserCredentials u WHERE u.emailId = :emailId")
    UserCredentials getUserByEmailId(@Param("emailId") String emailId);

}
