import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

  public UserId;
  public fetchusers = [];
  public userdata;
  public senderId;
  public senderName;
  public authToken;

  constructor(private service: UsermanagementserviceService, private Cookie: CookieService,
    private toastr: ToastrService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.authToken=this.Cookie.get('authToken');
    this.UserId = this._route.snapshot.paramMap.get('UserId');
    //console.log(this.UserId);
    this.myfriends(this.UserId);
  }

  public gotoDashboard=()=>{
    this.router.navigate(['/usertodolist',this.UserId])
  }

  public myfriends = (userid) => {
    this.service.MyFriends(userid,this.authToken).subscribe((response) => {
      if (response.status === 200) {
        console.log(response);
        this.fetchusers = response.data[0].friends;
        //console.log(this.fetchusers);
      }
      else {
        console.log(response);
      }
    })
  }

  public unfriendfromfriendlist=(friendname,friendid)=>{
    this.userdata=this.service.getuserinfofromlocalstorage();
    this.senderId=this.userdata.userdetails.UserId;
    this.senderName=this.userdata.userdetails.firstName+' '+this.userdata.userdetails.lastName;
    //console.log(this.senderName);
    //console.log(friendname);
    //console.log(friendid);
    let data={
      senderId:this.senderId,
      senderName:this.senderName,
      receiverId:friendid,
      receiverName:friendname,
      authToken:this.authToken
    }

    this.service.UnfriendFromFriendList(data).subscribe((response)=>{
      if(response.status===200)
      {
        this.toastr.success("Unfriend success");
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

  public friendtodolist=(friendname,friendid)=>{
   this.router.navigate(['/Friendalltodolist',friendname,friendid]);
  }

}
