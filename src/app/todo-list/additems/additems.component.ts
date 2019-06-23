import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
export class AdditemsComponent implements OnInit {

  public ListId;
  public UserId;
  public authToken;
  public ItemName;
  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private router:Router,private _route:ActivatedRoute,private cookie:CookieService) { }

  ngOnInit()
   {
    this.ListId=this._route.snapshot.paramMap.get('ListId');
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    this.authToken=this.cookie.get('authToken');
    //console.log(this.ListId);
    //console.log(this.UserId);
    //console.log(this.authToken);
  }

  public addItems=()=>{
    if(!this.ItemName)
    {
      this.toastr.warning("Please enter itemname");
    }
    else{
      let data={
        ItemName:this.ItemName,
        ListId:this.ListId,
        UserId:this.UserId,
        authToken:this.authToken
      }
      this.service.additems(data).subscribe((response)=>{
        if(response.status===200)
        {
          this.toastr.success("Item added in your list");
          console.log(response);
          setTimeout(()=>{
            this.router.navigate(['/usertodolist',data.UserId])
          },2000)
        }
        else
        {
          this.toastr.error("Unable to add item in your list");
          console.log(response);
        }
      })
    }    
  }
}
