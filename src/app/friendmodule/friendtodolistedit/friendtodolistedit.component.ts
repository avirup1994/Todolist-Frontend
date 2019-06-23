import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friendtodolistedit',
  templateUrl: './friendtodolistedit.component.html',
  styleUrls: ['./friendtodolistedit.component.css'],
  providers:[SocketService]
})
export class FriendtodolisteditComponent implements OnInit {
   
  public friendsingletodolist;
  public userdata;
  public UserId;
  public userName;
  public friendId;
  public ListId;
  public authToken;
  public friendName;

  constructor(private serivce:UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    this.friendName=this.cookie.get('friendname');
    this.userdata=this.serivce.getuserinfofromlocalstorage();
    this.userName=this.userdata.userdetails.firstName+' '+this.userdata.userdetails.lastName;
    //console.log(this.userName);
    this.UserId=this.userdata.userdetails.UserId;
    this.friendId=this._route.snapshot.paramMap.get('FriendId');
    this.ListId=this._route.snapshot.paramMap.get('ListId');
    let data={
      UserId:this.UserId,
      friendId:this.friendId,
      ListId:this.ListId,
      authToken:this.authToken
    }
    this.serivce.FriendSingleViewTodoList(data).subscribe((response)=>{
      if(response.status===200)
      {
        //console.log(response);
        this.friendsingletodolist=response.data[0];
        console.log(this.friendsingletodolist);
      }
      else{
        console.log(response);
      }
    })
  }

  public editfriendtodolist=()=>{
    let data={
      ListId:this.ListId,
      listModifierId:this.UserId,
      listModifierName:this.userName,
      UserId:this.UserId,
      friendId:this.friendId,
      authToken:this.authToken
    }

    let data2={
      userName:this.userName,
      friendName:this.friendName,
      friendId:this.friendId,
      UserId:this.UserId,
    }
    //this.socket.editfriendlist(data2);

    this.serivce.EditFriendTodoList(this.friendsingletodolist,data).subscribe((response)=>{
      if(response.status===200)
      {
        console.log(response);
        this.socket.editfriendlist(data2);
        this.toastr.success("Friend's list edited successfully");
        setTimeout(()=>{
          this.router.navigate(['/Friendalltodolist',this.friendName,data.friendId]);
        },2000)
      }
      else{
        console.log(response);
        this.toastr.error("Unbale to edit friend's list");
      }
    })
  }
}
