import { Component, OnInit } from '@angular/core';
import { UsermanagementserviceService } from 'src/app/usermanagementservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-gettodolist',
  templateUrl: './gettodolist.component.html',
  styleUrls: ['./gettodolist.component.css'],
  providers:[SocketService]
})
export class GettodolistComponent implements OnInit {

 public authToken;
 public UserId;
 public Collection=[];

  constructor(private service:UsermanagementserviceService,private toastr:ToastrService,
    private cookie:CookieService,private router:Router,private _route:ActivatedRoute,private socket:SocketService) { }

  ngOnInit() {
    this.authToken=this.cookie.get('authToken');
    this.UserId=this._route.snapshot.paramMap.get('UserId');
    //console.log(this.UserId);
    //this.checkauthToken();
    this.UserListCollection(); 
    this.verifyuserconfirmation();
    this.verifieduserconfirmation();
    
  }

  public verifyuserconfirmation=()=>{
    this.socket.verifyuser().subscribe((data)=>{
      console.log(data);
      this.socket.setuser(this.authToken);
    })
  }

  public verifieduserconfirmation=()=>{
    this.socket.verifieduser().subscribe((data)=>{
      console.log(data);
      this.ListenFriendRequest();
      this.Userfriends();
      this.ListenFriendDeleteList();
      this.ListenFriendEditedList();
      this.FriendFinalCall();
    })
  }

  public FriendFinalCall=()=>{
    this.socket.listenfriendfinalcall().subscribe((data)=>{
      console.log(data);
    })
  }

  public Userfriends=()=>{
    this.socket.AllUserFriends().subscribe((data)=>{
      console.log(data);
    })
   }
  
  public ListenFriendRequest=()=>{
    this.socket.listenfriendrequest(this.UserId).subscribe((data)=>{
      console.log(data);
      this.toastr.info(data);
    })
    }

    public ListenFriendDeleteList=()=>{
      this.socket.listendeletefriendlist().subscribe((data)=>{
        //console.log(data);
        this.toastr.info(`${data.username} has deleted ${data.friendname}'s list`);
      })
    }

    public ListenFriendEditedList=()=>{
      this.socket.listeneditfriendlist().subscribe((data)=>{
        console.log(data);
        this.toastr.info(`${data.userName} has edited ${data.friendName}'s list`);
      })
    }

  public UserListCollection=()=>{
    let securedata={
      authToken:this.authToken,
      UserId:this.UserId
    }
  this.service.UserList(securedata).subscribe((response)=>{
    if(response.status===200)
    {
      this.Collection=response.data;
      //console.log(this.Collection);
      console.log(response)
    }
    else{
      this.toastr.error("Unable to fetch all lists");
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },2000);
      console.log(response);
    }
  })
}

public createtodolist=()=>{
  this.router.navigate(['/createtodolist',this.UserId]);
}

public findfriends=()=>{
  this.router.navigate(['/findfriends']);
}

public friendrequestsent=()=>{
  this.router.navigate(['/friendrequestsent',this.UserId]);
}

public friendrequestreceived=()=>{
  this.router.navigate(['/friendrequestreceived',this.UserId]);
}

public myfriendlist=()=>{
  this.router.navigate(['/myfriendlist',this.UserId]);
}

public edititems=(Listid)=>{
  this.router.navigate(['/edittodolist',this.UserId,Listid]);
}
public additems=(Listid)=>{
  this.router.navigate(['/additems',this.UserId,Listid]);
}
public addsubitems=(Listid)=>{
this.router.navigate(['/addsubitems',this.UserId,Listid])
}
public deletelist=(ListId)=>{
let data={
  ListId:ListId,
  authToken:this.authToken,
  UserId:this.UserId
}
this.service.deletelist(data).subscribe((response)=>{
  if(response.status===200)
  {
    this.toastr.success("List deleted successfully");
    console.log(response);
    this.router.navigate(['/usertodolist',data.UserId]);
  }
  else{
    this.toastr.error("Unable to delete your list");
  }
})
}
}
