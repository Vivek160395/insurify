package com.stackroute.recommendationservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "Age Already in database")
public class AgeAlreadyExists extends Exception{
}
