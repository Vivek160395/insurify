import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  role:string="user";
  loginId:any='john@gmail.com';
  otherId:any=null;
  
  names:any[]=[];
  showMsgs:boolean=true;
  disable:boolean=true;

  msg:any[]=[
    {
    "id":null,
    "msg":null,
    "show":false   
  }
]

  chatMsg:any={
    "id":this.loginId,
    "msg":null
  }

  registerMsg:any={
      "chatRoomName":"null",
      "userName":null,
      "advisorName":null
  }

constructor(private http:HttpClient,private service:UserService) { }

ngOnInit(): void {
    this.getnames();
   }

   connect(id:any){
    if(this.role=="user"){
      this.registerMsg.userName=this.loginId;
      this.registerMsg.advisorName=id;
      this.registerMsg.chatRoomName=this.loginId+"&"+id;
      this.service.registerChatRoom(this.registerMsg).subscribe(
        data=>{
          this.getnames();
          this.getMsgsByName(id);
        }
      );
    }
    else{
      this.registerMsg.userName=id;
      this.registerMsg.advisorName=this.loginId;
      this.registerMsg.chatRoomName=id+"&"+this.loginId;
      this.service.registerChatRoom(this.registerMsg).subscribe(
        data=>{
          this.getnames();
          this.getMsgsByName(id);
        }
      );
 }
     
   }

getnames(){
  this.service.getNames(this.loginId).subscribe((data)=>{
  for(let i:number=0;i<data.length;i++){
    if(this.role=="user"){
      this.names[i]=data[i].advisorName;
    }
    else{
      this.names[i]=data[i].userName
    }}});}

getMsgsByName(id:string){
  this.showMsgs=false;
  this.otherId=id;
    if(this.role=='user'){
      this.service.getMsgs(this.loginId+"&"+this.otherId).subscribe(data=>{
          this.msg=data;
          for(let i:number=0;i<data.length;i++){
            if(data[i].id==this.loginId){
              this.msg[i].show=true;
            }} }) 
        }
    else{
      this.service.getMsgs(this.otherId+"&"+this.loginId).subscribe( data=>{
          this.msg=data;
          for(let i:number=0;i<data.length;i++){
            if(data[i].id==this.loginId){
              this.msg[i].show=true;}}});
    }
    this.scrollToBottom();
  }

sendMessage(){

if(this.chatMsg.msg!=null){
if(this.role=="user"){ this.service.updateMsgList(this.chatMsg,this.loginId+"&"+this.otherId).subscribe(data=>{
        this.getMsgsByName(this.otherId);} );
     }
  else{ this.service.updateMsgList(this.chatMsg,this.otherId+"&"+this.loginId).subscribe( data=>{
        this.getMsgsByName(this.otherId) });
    }
this.chatMsg.msg=null;
 }
}
  
scrollToBottom(){
  setTimeout(()=>{
    if(this.endOfChat){
      this.endOfChat.nativeElement.scrollIntoView({behavior:"smooth"
      })
    }

  },100)
 
}
}

