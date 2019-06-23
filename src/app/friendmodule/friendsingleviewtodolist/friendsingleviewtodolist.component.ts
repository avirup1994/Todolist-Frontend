import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friendsingleviewtodolist',
  templateUrl: './friendsingleviewtodolist.component.html',
  styleUrls: ['./friendsingleviewtodolist.component.css'],
  providers:[SocketService]
})
export class FriendsingleviewtodolistComponent implements OnInit {

  public friendId;
  public ListId;
  public userdata;
  public UserId;
  public singleview=[];
  public authToken;
  public username;
  public friendname;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
  private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
  this.authToken=this.cookie.get('authToken');
  this.userdata=this.service.getuserinfofromlocalstorage();
  this.username=this.userdata.userdetails.firstName+' '+this.userdata.userdetails.lastName;
  //console.log(this.username);
  this.UserId=this.userdata.userdetails.UserId;
  //console.log(this.UserId);
  this.friendId=this._route.snapshot.paramMap.get('FriendId');
  //console.log(this.friendId);
  this.ListId=this._route.snapshot.paramMap.get('ListId');
  //console.log(this.ListId);
  this.friendname=this.cookie.get('friendname');
  //console.log(this.friendname);
  this.friendsingleviewtodolist();
  }

  public gotoDashboard=()=>{
    this.router.navigate(['/usertodolist',this.UserId])
  }

  public friendsingleviewtodolist=()=>{
    let data={
      UserId:this.UserId,
      friendId:this.friendId,
      ListId:this.ListId,
      authToken:this.authToken
    }
    this.service.FriendSingleViewTodoList(data).subscribe((response)=>{
     if(response.status===200)
     {
       //console.log(response);
       this.singleview=response.data;
       console.log(this.singleview);
     }
     else{
       console.log(response);
     }
    })
  }

  public editfriendlist=(friendid,listid)=>{
  this.router.navigate(['/Friendtodolistedit',friendid,listid]);
  }

  public deletefriendlist=(friendid,listid)=>{
    //console.log(friendid);
    //console.log(listid);
    let data={
      UserId:this.UserId,
      friendId:friendid,
      ListId:listid,
      authToken:this.authToken
    }
    let data2={
      username:this.username,
      friendname:this.friendname,
      UserId:this.UserId,
      friendId:friendid,
    }
  
   this.service.DeleteFriendTodoList(data).subscribe((response)=>{
     if(response.status===200)
     {
       console.log(response);
       this.socket.deletefriendlist(data2);
       this.toastr.success("Friend's list deleted successfully");
       setTimeout(()=>{
        this.router.navigate(['/Friendalltodolist',this.friendname,data.friendId]);
      },2000)
     }
     else{
       console.log(response);
       this.toastr.error("Unable to delete friend's list");
     }
   })
  }

}
