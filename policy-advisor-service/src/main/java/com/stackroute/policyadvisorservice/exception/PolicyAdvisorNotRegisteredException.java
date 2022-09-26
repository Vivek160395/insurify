package com.stackroute.policyadvisorservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Policy Advisor Not Found \n Want to Register??")
public class PolicyAdvisorNotRegisteredException extends Exception{
}
