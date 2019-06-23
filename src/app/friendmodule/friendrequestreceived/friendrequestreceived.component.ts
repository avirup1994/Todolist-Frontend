import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friendrequestreceived',
  templateUrl: './friendrequestreceived.component.html',
  styleUrls: ['./friendrequestreceived.component.css'],
  providers:[SocketService]
})
export class FriendrequestreceivedComponent implements OnInit {

  public UserId;
  public fetchusers = [];
  public userdata;
  public senderId;
  public senderName;
  public authToken;

  constructor(private service: UsermanagementserviceService, private cookie: CookieService,private socket:SocketService,
    private toastr: ToastrService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    this.UserId = this._route.snapshot.paramMap.get('UserId');
    this.receivedfriendrequest(this.UserId);
  }

  public gotoDashboard=()=>{
    this.router.navigate(['/usertodolist',this.UserId])
  }

  public receivedfriendrequest = (userid) => {
    this.service.ReceivedFriendRequest(userid,this.authToken).subscribe((response) => {
      if (response.status === 200) {
        //console.log(response);
        this.fetchusers = response.data[0].friendRequestRecieved;
        console.log(this.fetchusers);
      }
      else {
        console.log(response);
      }
    })
  }
  public acceptingfriendrequest = (friendName, friendId) => {
    this.userdata = this.service.getuserinfofromlocalstorage();
    this.senderId = this.userdata.userdetails.UserId;
    //console.log(this.senderId);
    this.senderName = this.userdata.userdetails.firstName + ' ' + this.userdata.userdetails.lastName;
    //console.log(this.senderName)
    let data = {
      senderName: this.senderName,
      senderId: this.senderId,
      receiverId: friendId,
      receiverName: friendName,
      authToken:this.authToken
    }

    let socketdetails={
      senderName: this.senderName,
      senderId: this.senderId,
    }
    //console.log(socketdetails);
    this.service.AcceptingFriendRequest(data).subscribe((response)=>{
      if(response.status===200)
      {
        setTimeout(()=>{
          this.router.navigate(['/myfriendlist',this.UserId]);
        },2000)
        this.socket.AcceptFriendRequest(response.data,socketdetails);
        console.log(response);
      }
      else{
        this.toastr.error("Unable to accept friend request");
        console.log(response);
      }
    })
  }

  public rejectfriendrequest=(friendName,friendId)=>{
    this.userdata = this.service.getuserinfofromlocalstorage();
    this.senderId = this.userdata.userdetails.UserId;
    //console.log(this.senderId);
    this.senderName = this.userdata.userdetails.firstName + ' ' + this.userdata.userdetails.lastName;
    //console.log(this.senderName)
    //console.log(friendName);
    //console.log(friendId);

    let data = {
      senderName: this.senderName,
      senderId: this.senderId,
      receiverId: friendId,
      receiverName: friendName,
      authToken:this.authToken
    }

    this.service.RejectFriendRequest(data).subscribe((response)=>{
      if(response.status===200)
      {
        this.toastr.success("Request rejected successfully");
        setTimeout(()=>{
          this.router.navigate(['/usertodolist',this.UserId]);
        },2000)
        console.log(response);
      }
      else{
        this.toastr.error("Unable to proceed request");
        console.log(response);
      }
    })
  }
}
