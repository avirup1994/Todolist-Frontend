import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friendrequestsent',
  templateUrl: './friendrequestsent.component.html',
  styleUrls: ['./friendrequestsent.component.css']
})
export class FriendrequestsentComponent implements OnInit {

  public UserId;
  public fetchusers=[];
  public authToken;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
  private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    this.friendrequestsent(this.UserId);
  }

  public gotoDashboard=()=>{
    this.router.navigate(['/usertodolist',this.UserId])
  }

  public friendrequestsent=(userid)=>{
    this.service.FriendRequestSent(userid,this.authToken).subscribe((response)=>{
      if(response.status===200)
      {
        console.log(response);
        this.fetchusers=response.data[0].friendRequestSent;
        console.log(this.fetchusers);
      }
      else{
        console.log(response);
      }
    })
  }

}
