package com.stackroute.recommendationservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "InsuranceType already in database")
public class InsuranceTypeAlreadyExists extends Exception {

}
