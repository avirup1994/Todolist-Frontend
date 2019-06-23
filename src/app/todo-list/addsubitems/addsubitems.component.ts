import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addsubitems',
  templateUrl: './addsubitems.component.html',
  styleUrls: ['./addsubitems.component.css']
})
export class AddsubitemsComponent implements OnInit {

  public authToken;
  public ListId;
  public SubItemName;
  public UserId;
  public ItemName;
  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private router:Router,private _route:ActivatedRoute) { }

  ngOnInit() {
    this.ListId=this._route.snapshot.paramMap.get('ListId');
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    this.authToken=this.cookie.get('authToken');
  }

  public addSubItems=()=>{
    if(!this.ItemName)
    {
      this.toastr.warning("Please enter itemname");
    }
    else if(!this.SubItemName)
    {
      this.toastr.warning("Please enter subitemname");
    }
    else{
      let data={
        SubItemName:this.SubItemName,
        ItemName:this.ItemName,
        authToken:this.authToken,
        ListId:this.ListId,
        UserId:this.UserId
      }
      this.service.addsubitems(data).subscribe((response)=>{
        if(response.status===200)
        {
          this.toastr.success("Sub item added in your list");
          console.log(response);
          setTimeout(()=>{
            this.router.navigate(['/usertodolist',data.UserId])
          },2000)
        }
        else{
          this.toastr.error("Unable to add subitem in your list");
          console.log(response);
        }
      })
   }
  }
}
