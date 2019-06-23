import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:String;
  public lastName:String;
  public email:any;
  public Password:any;
  public mobileNumber:Number;
  public countrycode:Number;
  public countrylist=[];

  constructor(private toastr:ToastrService,private service:UsermanagementserviceService,
    private router:Router) { }

  public signup=()=>{
    if(!this.firstName){
    this.toastr.warning("Please enter firstname")
    }
    else if(!this.lastName)
    {
      this.toastr.warning("Please enter lastname")
    }
    else if(!this.email)
    {
      this.toastr.warning("Please enter email")
    }
    else if(!this.Password)
    {
      this.toastr.warning("Please enter password")
    }
    else if(!this.countrycode)
    {
      this.toastr.warning("Please enter countrycode")
    }
    else if(!this.mobileNumber)
    {
      this.toastr.warning("Please enter mobilenumber")
    }
    else if(!this.countrycode)
    {
      this.toastr.warning("Please enter countrycode")
    }
    else{
      let data={
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        Password:this.Password,
        mobileNumber:this.mobileNumber,
        countrycode:this.countrycode
      }
      this.service.SignUp(data).subscribe((response)=>{
      if(response.status===200)
      {
        this.toastr.success("Sign up successful");
        setTimeout(()=>{
          this.router.navigate(['/login'])
        },2000)
      }
      else{
        this.toastr.error("Sign up failed");
        console.log(response)
      }
      })
      
    }
  }
  ngOnInit() {
    this.service.getCountryCode().subscribe((data)=>{
      //console.log(data);
      for(let x in data)
      {
       this.countrylist.push({
         'key':x,
         'value':data[x]
       })
      }
      //console.log(this.countrylist);
    })
  
  }

}
