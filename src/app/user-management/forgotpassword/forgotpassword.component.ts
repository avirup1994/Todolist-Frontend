import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public email:any;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
  private router:Router) { }

  public ForgotPassword=()=>{
    if(!this.email)
    {
      this.toastr.warning("Please enter your email")
    }
    else{
      let data={
        email:this.email
      }
      this.service.Forgotpassword(data).subscribe((response)=>{
        if(response.status===200)
        {
          this.toastr.success("A temporary password sent to your mail");
          //console.log(response);
          setTimeout(()=>{
            this.router.navigate(['/update']);
          },2000)
        }
        else{
          this.toastr.error("Unable to generate temorary password");
        }
      })
    }
  }
  ngOnInit() {
  }

}
