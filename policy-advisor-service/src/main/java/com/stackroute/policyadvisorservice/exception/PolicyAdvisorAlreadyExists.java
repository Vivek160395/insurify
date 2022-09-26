package com.stackroute.policyadvisorservice.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "PolicyAdvisorAlreadyExists")
public class PolicyAdvisorAlreadyExists  extends Exception{
}
