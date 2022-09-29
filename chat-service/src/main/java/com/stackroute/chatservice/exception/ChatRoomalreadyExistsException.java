package com.stackroute.chatservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "ChatRoomAlreadyRegistered")
public class ChatRoomalreadyExistsException extends Exception{
}
