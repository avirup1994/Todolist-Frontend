import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  public email:String;
  public usershortPassword:any;
  public Password:any;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private router:Router) { }

  public UpdatePassword=()=>{
    if(!this.email)
    {
      this.toastr.warning("Please enter email");
    }
    else if(!this.usershortPassword)
    {
      this.toastr.warning("Please enter temporary password");
    }
    else if(!this.Password)
    {
      this.toastr.warning("Please enter your updated password")
    }
    else{
      let data={
        email:this.email,
        usershortPassword:this.usershortPassword,
        Password:this.Password
      }
      this.service.Updatepassword(data).subscribe((response)=>{
        if(response.status===200)
        {
          //console.log(response);
          this.toastr.success("Your password successfully updated");
          setTimeout(()=>{
            this.router.navigate(['/login'])
          },1000)
        }
        else{
          this.toastr.error("Unable to update your password");
        }
      })
    }
  }
  ngOnInit() {
  }

}
