import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {catchError,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementserviceService {

  constructor(private httpclient:HttpClient) { }

  public baseurl="http://localhost:3300/api/v1";

   //Method to get country list
   public getCountryList=()=>{
    let response=this.httpclient.get('../assets/countryList.json');
    return response;
  }

  //method to get country code
  public getCountryCode=()=>{
    let response=this.httpclient.get('../assets/codeList.json');
    return response;
  }

  //Login function..
  public Login(data):any{
    const output=new HttpParams()
    .set('email',data.email)
    .set('Password',data.Password)
    return this.httpclient.post(this.baseurl+'/login',output);
  }

  //Signup function..
  public SignUp(data):any{
    const output=new HttpParams()
    .set('email',data.email)
    .set('Password',data.Password)
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobileNumber',data.mobileNumber)
    .set('countrycode',data.countrycode)
    return this.httpclient.post(this.baseurl+'/signup',output);
  }

  //Forgot password..
  public Forgotpassword(data):any{
    const output=new HttpParams()
    .set('email',data.email)
    return this.httpclient.put(this.baseurl+'/forgotpassword',output);
  }

  //Update password..
  public Updatepassword(data):any{
    const output=new HttpParams()
    .set('email',data.email)
    .set('usershortPassword',data.usershortPassword)
    .set('Password',data.Password)
    return this.httpclient.put(this.baseurl+'/UpdatePassword',output);
  }

  //Logout function..
  public LogOut(data):any{
    const output=new HttpParams()
    .set('UserId',data)
    return this.httpclient.post(this.baseurl+'/logout',output);
  }
  
  //user's all todolist..
  public UserList(data):any{
    let response=this.httpclient.get(this.baseurl+'/getlistbyuserid'+'/'+data.UserId+'?authToken='+data.authToken);
    return response;
  }

  //Add items to todolist by user..
  public additems(data):any{
    const output=new HttpParams()
    .set('ItemName',data.ItemName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/additems'+'/'+data.UserId+'/'+data.ListId,output);
  }

  //Add sub-items to todolist by user..
  public addsubitems(data):any{
    const output=new HttpParams()
    .set('SubItemName',data.SubItemName)
    .set('ItemName',data.ItemName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/addsubitems'+'/'+data.UserId+'/'+data.ListId,output);
  }

  //Delete list by user..
  public deletelist(data):any{
    const output=new HttpParams()
    .set('authToken',data.authToken)
    return this.httpclient.post(this.baseurl+'/Deleteitem'+'/'+data.UserId+'/'+data.ListId,output);
  }
  
  //Create list by user..
  public CreateList(data):any{
    const output=new HttpParams()
    .set('ListName',data.ListName)
    .set('ItemName',data.ItemName)
    .set('SubItemName',data.SubItemName)
    //.set('UserId',data.UserId)
    .set('authToken',data.authToken)
    return this.httpclient.post(this.baseurl+'/createlist'+'/'+data.UserId,output);
  }
   
  //Get user's list by listId.. 
  public GetListbyUserListId(data):any{
    let response=this.httpclient.get(this.baseurl+'/getlistbyUserIdlistId'+'/'+data.UserId+'/'+data.ListId+'?authToken='+data.authToken);
    return response;
  }

  //Edit list by user..
  public EditList(data,data2):any{
    const output=new HttpParams()
    .set('ListName',data.ListName)
    .set('ItemName',data.ItemName)
    .set('SubItemName',data.SubItemName)
    .set('authToken',data2)
    return this.httpclient.put(this.baseurl+'/editlist'+'/'+data.UserId+'/'+data.ListId,output);
  }

  //Find all friends...
  public getallfriends(data):any{
   let response=this.httpclient.get(this.baseurl+'/getallusers'+'?authToken='+data.authToken);
   return response;
  }

  //Sending friend request by sender...
  public SendFriendRequest(data):any{
    const output=new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('receiverId',data.receiverId)
    .set('receiverName',data.receiverName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/sentrequest',output);
  }

  //Friend request sent by sender..
  public FriendRequestSent(data,data2):any{
    let response=this.httpclient.get(this.baseurl+'/requestsent'+'/'+data+'?authToken='+data2);
    return response;
   }

   //Friend request received...
   public ReceivedFriendRequest(data,data2):any{
    let response=this.httpclient.get(this.baseurl+'/requestreceived'+'/'+data+'?authToken='+data2);
    return response;
   }

   //Accepting friend request..
   public AcceptingFriendRequest(data):any{
    const output=new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('receiverId',data.receiverId)
    .set('receiverName',data.receiverName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/acceptrequest',output);
   }

   //user's all friends list..
   public MyFriends(data,data2):any{
    let response=this.httpclient.get(this.baseurl+'/friendlist'+'/'+data+'?authToken='+data2);
    return response;
   }
   
   //Removing friend from user's friend list..
   public UnfriendFromFriendList(data):any{
    const output=new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('receiverId',data.receiverId)
    .set('receiverName',data.receiverName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/cancelledrequest',output);
   }
   
   //Rejecting friend request..
   public RejectFriendRequest(data):any{
    const output=new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('receiverId',data.receiverId)
    .set('receiverName',data.receiverName)
    .set('authToken',data.authToken)
    return this.httpclient.put(this.baseurl+'/rejectrequest',output);
   }

   //Friend's all todolist..
   public FriendAllTodoLists(data):any{
    const output=new HttpParams()
    .set('UserId',data.UserId)
    .set('friendId',data.friendId)
    .set('authToken',data.authToken)
    return this.httpclient.post(this.baseurl+'/friendusertodolist',output);
   }

   //Friend's single todolist view..
   public FriendSingleViewTodoList(data):any{
    const output=new HttpParams()
    .set('UserId',data.UserId)
    .set('friendId',data.friendId)
    .set('ListId',data.ListId)
    .set('authToken',data.authToken)
    return this.httpclient.post(this.baseurl+'/friendusersingletodolist',output);
   }

   //Delete friend's todolist..
   public DeleteFriendTodoList(data):any{
    const output=new HttpParams()
    .set('UserId',data.UserId)
    .set('friendId',data.friendId)
    .set('ListId',data.ListId)
    .set('authToken',data.authToken)
    return this.httpclient.post(this.baseurl+'/deletefriendtodolist',output);
   }

   //Edit friend's todolist..
   public EditFriendTodoList(data,data2):any{
    const output=new HttpParams()
    .set('ListName',data.ListName)
    .set('ItemName',data.ItemName)
    .set('SubItemName',data.SubItemName)
    .set('ListId',data2.ListId)
    .set('listModifierId',data2.listModifierId)
    .set('listModifierName',data2.listModifierName)
    .set('authToken',data2.authToken)
    return this.httpclient.put(this.baseurl+'/editfriendtodolist'+'/'+data2.UserId+'/'+data2.friendId,output);
   }
   
   //Get information from Local storage..
  public getuserinfofromlocalstorage=()=>{
    return JSON.parse(localStorage.getItem('userinfo'));
    }
    public setuserinfo=(input)=>{
      localStorage.setItem('userinfo',JSON.stringify(input));
    }

    //Set user's information to local storage..
    public getTodolistdetails=()=>{
      return JSON.parse(localStorage.getItem('userinfo'));
      }
      public setTodolistdetails=(input)=>{
        localStorage.setItem('userinfo',JSON.stringify(input));
      }
}
