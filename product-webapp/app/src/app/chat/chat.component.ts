import { Component, OnInit } from '@angular/core';
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


  role:string="user";
  loginId:any='john@gmail.com';
  otherId:any=null;
  
  names:any[]=[];
  msgs:any[]=[];
  showMsgs:boolean=true;

  // userId:string='john@gmail.com';
  // advisorId:any=null;
  // chaturl:any=this.userId+"&"+this.advisorId;
  // myId:any=this.userId;
  
  
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

constructor(private http:HttpClient,private service:UserService) { }

ngOnInit(): void {
   
    this.getnames();
   }

// registerOnConnect(){
//   this.service.registerChatRoom(this.msg).subscribe();
// }

getnames(){
  this.service.getNames(this.loginId).subscribe(
    (data)=>{
  for(let i:number=0;i<data.length;i++){
    if(this.role=="user"){
      this.names[i]=data[i].advisorName;
    }
    else{
      this.names[i]=data[i].userName
    }
   }
});
}

getMsgsByName(id:string){
  this.showMsgs=false;
  this.otherId=id;
    if(this.role=='user'){
      this.service.getMsgs(this.loginId+"&"+this.otherId).subscribe(
        data=>{
          console.log(data);
          this.msgs=data;
          this.msg=data;
          console.log(this.msg);
          for(let i:number=0;i<data.length;i++){
            if(data[i].id==this.loginId){
              this.msg[i].show=true;
            }
          }
        }
      )
    }
    else{
      this.service.getMsgs(this.otherId+"&"+this.loginId).subscribe(
        data=>{
          console.log(data);
          this.msgs=data;
        }
      );
    }
    
}

sendMessage(){
if(this.role=="user"){
    this.service.updateMsgList(this.chatMsg,this.loginId+"&"+this.otherId).subscribe();
}
  else{
    this.service.updateMsgList(this.chatMsg,this.otherId+"&"+this.loginId).subscribe();
}
this.chatMsg.msg=null;
this.getMsgsByName(this.otherId);

  }
  
}

