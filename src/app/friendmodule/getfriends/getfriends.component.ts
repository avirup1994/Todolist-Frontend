import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-getfriends',
  templateUrl: './getfriends.component.html',
  styleUrls: ['./getfriends.component.css']
})
export class GetfriendsComponent implements OnInit {

  public allfriendsarray=[];
  public userdata;
  public senderId;
  public senderName;
  public receiverId;
  public receiverName;
  public authToken;
  
  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
  private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    //console.log(this.authToken);
    this.getfriends();
  }

  public getfriends=()=>{
    let data={
      authToken:this.authToken
    }
    this.service.getallfriends(data).subscribe((response)=>{
     if(response.status===200)
     {
       this.toastr.success("All friends fetched successfully");
       this.allfriendsarray=response.data;
       console.log(this.allfriendsarray);
      
     }
     else{
       this.toastr.error("Unable to find friends");
       console.log(response);
     }
    })
  }

public sendfriendrequest=(receiverid,firstName,lastName)=>{
  this.userdata=this.service.getuserinfofromlocalstorage();
  this.senderId=this.userdata.userdetails.UserId;
  this.senderName=this.userdata.userdetails.firstName+' '+this.userdata.userdetails.lastName;
  this.receiverName=firstName+' '+lastName;
  this.receiverId=receiverid;

  let data={
    senderId:this.senderId,
    senderName:this.senderName,
    receiverName:this.receiverName,
    receiverId:this.receiverId,
    authToken:this.authToken
  }
  let socketuserdetails={
    senderId:this.senderId,
    senderName:this.senderName,
  }
  this.service.SendFriendRequest(data).subscribe((response)=>{
    if(response.status===200)
    {
      console.log(response);
      this.toastr.success("Friend request sent successfully")
      this.socket.receivedfriendrequest(response.data,socketuserdetails);
    }
    else{
      console.log(response);
      this.toastr.error("Unable to send friend request");
    }
  })
}
}
