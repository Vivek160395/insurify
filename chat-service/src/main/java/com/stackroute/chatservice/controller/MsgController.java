package com.stackroute.chatservice.controller;

import com.stackroute.chatservice.exception.ChatRoomalreadyExistsException;
import com.stackroute.chatservice.model.ChatMsg;
import com.stackroute.chatservice.model.Message;
import com.stackroute.chatservice.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MsgController {

//     String user;
//     String advisor;


     @Autowired
     MsgService msgService;



     public MsgController(MsgService msgService) {

        this.msgService=msgService;
    }


//    @PostMapping("/api/userId")
//    public void getUserId(@RequestBody String email1){
//       user=email1;
//    }
//
//    @PostMapping("/api/advisorId")
//    public void getAdvisorId(@RequestBody String email2){
//        advisor=email2;
//    }
//
//
//    @MessageMapping("/resume")
//    public void response(String msg){
//        template.convertAndSend("/start/initial/"+user+"&"+advisor,msg);
//    }


    @GetMapping("/api/msg/{chatRoomName}")
    public ResponseEntity<?> getMsgsList(@PathVariable String chatRoomName){
        return new ResponseEntity<>(msgService.getMsgList(chatRoomName), HttpStatus.OK);
    }

    @GetMapping("api/msg/all")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(msgService.getAll(),HttpStatus.OK);
    }

    @GetMapping("api/names/{id}")
    public ResponseEntity<?> getNames(@PathVariable String id){
         return new ResponseEntity<>(msgService.getNames(id),HttpStatus.OK);
    }

    @PostMapping("api/register/chatroom")
    public ResponseEntity<?> registerChatRoom(@RequestBody Message message) throws ChatRoomalreadyExistsException {
   return new ResponseEntity<>(msgService.registerChatRoom(message),HttpStatus.OK);
    }

    @PutMapping("/api/update/msg/{chatRoomName}")
    public ResponseEntity<?> updateMsgList(@RequestBody ChatMsg msg, @PathVariable String chatRoomName){
       return new ResponseEntity<>(msgService.updateMsgList(msg,chatRoomName),HttpStatus.OK) ;
    }
}



