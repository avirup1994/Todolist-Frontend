import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friendalltodolist',
  templateUrl: './friendalltodolist.component.html',
  styleUrls: ['./friendalltodolist.component.css'],
  providers:[SocketService]
})
export class FriendalltodolistComponent implements OnInit {
   
  public friendId;
  public userdata;
  public UserId;
  public friendlist=[];
  public authToken;
  public friendname;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private rotuer:Router,private _route:ActivatedRoute,private socket:SocketService ) { }

  ngOnInit() {
  this.authToken=this.cookie.get('authToken');
  this.friendId=this._route.snapshot.paramMap.get('FriendId');
   this.friendname=this._route.snapshot.paramMap.get('friendname');
   //console.log(this.friendname);
   this.cookie.set('friendname',this.friendname);
   this.userdata=this.service.getuserinfofromlocalstorage();
   this.UserId=this.userdata.userdetails.UserId;
   this.friendalltodolists();
  }

  public friendalltodolists=()=>{
    let data={
      UserId:this.UserId,
      friendId:this.friendId,
      authToken:this.authToken
    }
    
    this.service.FriendAllTodoLists(data).subscribe((response)=>{
      if(response.status===200)
      {
        this.toastr.success("All list fetched successfully");
        //console.log(response);
        this.friendlist=response.data;
        console.log(this.friendlist);
      }
      else if(response.status===301){
        console.log(response);
        this.toastr.warning("No todolist found or your friend's todolist is empty");
      }
      else{
        this.toastr.error("Unable to fetch friend's todolist");
        console.log(response);
      }
    })
  }

  public gotoDashboard=()=>{
    this.rotuer.navigate(['/usertodolist',this.UserId])
  }

  public friendsingleviewlist=(friendid,listid)=>{
    this.rotuer.navigate(['/Friendsingleviewtodolist',friendid,listid]);
  }

}
