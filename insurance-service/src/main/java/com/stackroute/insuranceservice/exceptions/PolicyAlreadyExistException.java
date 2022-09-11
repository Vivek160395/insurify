package com.stackroute.insuranceservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Policy Already Exist")
public class PolicyAlreadyExistException extends Exception{
}