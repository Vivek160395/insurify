package com.stackroute.purchaseinsuranceservice.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND , reason = "policyID does not exist")
public class PolicyIdNotFoundException extends Exception{
}
