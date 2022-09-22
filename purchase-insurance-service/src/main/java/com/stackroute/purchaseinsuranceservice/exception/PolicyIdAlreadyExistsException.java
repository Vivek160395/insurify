package com.stackroute.purchaseinsuranceservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT , reason = "policyId already exists")
public class PolicyIdAlreadyExistsException extends Exception{
}
