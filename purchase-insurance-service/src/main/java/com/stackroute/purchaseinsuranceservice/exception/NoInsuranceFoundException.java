package com.stackroute.purchaseinsuranceservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "No Insurance found for given email")
public class NoInsuranceFoundException extends Exception{
}
