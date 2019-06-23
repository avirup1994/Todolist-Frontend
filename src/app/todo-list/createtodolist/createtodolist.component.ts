import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-createtodolist',
  templateUrl: './createtodolist.component.html',
  styleUrls: ['./createtodolist.component.css']
})
export class CreatetodolistComponent implements OnInit {

  public authToken;
  public UserId;
  public ListName;
  public ItemName;
  public SubItemName;

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private router:Router,private _route:ActivatedRoute,private cookie:CookieService) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    //console.log(this.authToken);
  }

public CreateTodoList=()=>{

let data={
  ListName:this.ListName,
  ItemName:this.ItemName,
  SubItemName:this.SubItemName,
  authToken:this.authToken,
  UserId:this.UserId
}
this.service.CreateList(data).subscribe((response)=>{
  if(response.status===200)
  {
    console.log(response);
    this.toastr.success("Todolist created successfully");
    setTimeout(()=>{
      this.router.navigate(['usertodolist',this.UserId]);
    },2000)
  }
  else{
    this.toastr.error("Unable to create todolist");
    console.log(response);
  }
})
}
}
