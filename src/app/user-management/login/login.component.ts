import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any;
  public Password:any;
  
  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private router:Router) { }

  public Login(){
    if(!this.email){
      this.toastr.warning("Please enter email");
    }
    else if(!this.Password)
    {
      this.toastr.warning("Please enter Password");
    }
    else{
    let data={
      email:this.email,
      Password:this.Password
    }
    this.service.Login(data).subscribe((response)=>{
      if(response.status===200){
        this.toastr.success('You are logged in');
        this.service.setuserinfo(response.data);
        this.cookie.set('authToken',response.data.authToken);
        //console.log(response.data.userdetails.UserId);
        setTimeout(()=>{
          this.router.navigate(['/usertodolist',response.data.userdetails.UserId])
        },1000)
      }
      else{
        this.toastr.error("Log in failed please enter correct email and password");
      }
    })
  }
}

public Forgot=()=>{
this.router.navigate(['/forgot'])
}

  ngOnInit() {
    
  }

}
