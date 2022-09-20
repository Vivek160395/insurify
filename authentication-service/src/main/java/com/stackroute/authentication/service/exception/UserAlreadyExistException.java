package com.stackroute.authentication.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.CONFLICT,reason=" UserAlreadyExistException")
public class UserAlreadyExistException extends Exception{
}
