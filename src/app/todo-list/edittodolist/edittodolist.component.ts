import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edittodolist',
  templateUrl: './edittodolist.component.html',
  styleUrls: ['./edittodolist.component.css']
})
export class EdittodolistComponent implements OnInit {

  public UserId;
  public ListId;
  public singlelist;

  public ListName;
  public ItemName;
  public SubItemName;
  public authToken;
  constructor(private service:UsermanagementserviceService,private cookie:CookieService,
    private toastr:ToastrService,private router:Router,private _route:ActivatedRoute) { }

  ngOnInit() {
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    //console.log(this.UserId);
    this.ListId=this._route.snapshot.paramMap.get('ListId');
    this.authToken=this.cookie.get('authToken');
    //console.log(this.ListId);
      let data={
        UserId:this.UserId,
        ListId:this.ListId,
        authToken:this.authToken
      }
      this.service.GetListbyUserListId(data).subscribe((response)=>{
        if(response.status===200)
        {
          console.log(response);
          this.singlelist=response.data[0];
          //console.log(this.singlelist);
        }
        else{
          console.log(response);
          console.log("Error");
        }
      })
  }
   
  public editlist=()=>{

    this.service.EditList(this.singlelist,this.authToken).subscribe((response)=>{
     if(response.status===200)
     {
       console.log(response);
       this.toastr.success("List edited successfully");
       setTimeout(()=>{
        this.router.navigate(['usertodolist',this.UserId]);
      },2000)
     }
     else{
       console.log(response);
       this.toastr.error("Unable to edit list");
     }
    })
  }

}
