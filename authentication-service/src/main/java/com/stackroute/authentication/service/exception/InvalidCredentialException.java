package com.stackroute.authentication.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.UNAUTHORIZED,reason=" Invalid Credentials Exception")
public class InvalidCredentialException extends Exception{
}
