package com.stackroute.authentication.service.security;

import com.stackroute.authentication.service.model.UserCredentials;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String,String> generateToken(UserCredentials user);//token and message -> the return type can be String also
}
