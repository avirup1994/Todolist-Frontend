import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  public userdata;
  public UserId;
  public UserName;
  constructor(private service: UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
  this.userdata=this.service.getuserinfofromlocalstorage();
  this.UserId=this.userdata.userdetails.UserId;
  this.UserName=this.userdata.userdetails.firstName+' '+this.userdata.userdetails.lastName;
  //console.log(this.UserId);
  let data={
    UserId:this.UserId,
    UserName:this.UserName
  }
  this.service.LogOut(this.UserId).subscribe((response)=>{
    if(response.status===200)
    {
      this.toastr.success("You are loggedout successfully");
      console.log(response);
      this.cookie.delete('authToken');
      this.socket.disconnect(data);
      this.router.navigate(['/login']);
    }
    else{
      this.toastr.error("Unable to logout");
      console.log(response);
    }
  })
  }

}
