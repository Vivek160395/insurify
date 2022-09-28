package com.stackroute.chatservice.service;

import com.stackroute.chatservice.exception.ChatRoomalreadyExistsException;
import com.stackroute.chatservice.model.ChatMsg;
import com.stackroute.chatservice.model.Message;
import com.stackroute.chatservice.repository.MsgRepos;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MsgService {

public MsgRepos msgRepos;

    public MsgService(MsgRepos msgRepos) {
        this.msgRepos = msgRepos;
    }

    public List<ChatMsg> updateMsgList(ChatMsg chatMsg,String chatRoomName){
        Message message=msgRepos.findById(chatRoomName).get();
        List<ChatMsg> x=message.getMsgs();
        if(x==null){
            x=new ArrayList<>();
            x.add(chatMsg);
        }
        else {
            x.add(chatMsg);
        }
        message.setMsgs(x);
        msgRepos.save(message);
        return message.getMsgs();
    }

    public List<ChatMsg> getMsgList(String chatRoomName){
        Message message=msgRepos.findById(chatRoomName).get();
        List<ChatMsg> chatMsgs=new ArrayList<>();
        chatMsgs=message.getMsgs();
        return chatMsgs;
    }

    public Message registerChatRoom(Message message) throws ChatRoomalreadyExistsException{
        if(msgRepos.findById(message.getChatRoomName()).isPresent()){
            throw new ChatRoomalreadyExistsException();
        }
        else {
            msgRepos.save(message);
            return message;
        }
    }

    public List<Message> getAll(){
     List<Message> m=msgRepos.findAll();
     return  m;
    }

    public List<Message> getNames(String id){
        List<Message> m=msgRepos.findAll();
        List<Message> m2=new ArrayList<>();
        for(int i=0;i<m.size();i++){
            if(m.get(i).getChatRoomName().contains(id)){
                m2.add(m.get(i));
            }
        }
        return m2;
    }

}