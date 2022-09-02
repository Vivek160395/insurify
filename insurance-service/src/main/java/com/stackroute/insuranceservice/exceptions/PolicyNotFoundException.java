package com.stackroute.insuranceservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Policy Not found")
public class PolicyNotFoundException extends Exception{
}
