import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import *as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  private baseurl = "http://localhost:3300";

  constructor(private http: HttpClient) {
    this.socket = io(this.baseurl);
  }

  //Verify user..
  public verifyuser = () => {
    return Observable.create((observer) => {
      this.socket.on('verify-user', (data) => {
        observer.next(data);
      })
    })
  }

  //Sending authtoken to server..
  public setuser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }

  //After verification from server response..
  public verifieduser = () => {
    return Observable.create((observer) => {
      this.socket.on('verified', (data) => {
        observer.next(data);
      })
    })
  }

  //Sending friend request..
  public receivedfriendrequest = (data, userdetails) => {
    this.socket.emit('receivedfriend', data, userdetails);
  }

//listening friend request..
  public listenfriendrequest = (userid) => {
    return Observable.create((observer) => {
      this.socket.on(userid, (data) => {
        observer.next(data);
      })
    })
  }

  //Accepting friend request..
  public AcceptFriendRequest = (data, data2) => {
    this.socket.emit('acceptfriend', data, data2);
  }

  //All user's friends.. 
  public AllUserFriends=()=>{
    return Observable.create((observer) => {
      this.socket.on('Users', (data) => {
        observer.next(data);
      })
    })
  }

  //Deleting friend list..
  public deletefriendlist=(data)=>{
  this.socket.emit('Deletefriendlist',data)
  }

  //Listening deleted list..
  public listendeletefriendlist = () => {
    return Observable.create((observer) => {
      this.socket.on('frienddeletedlist', (data) => {
        observer.next(data);
      })
    })
  }

  //Editing friend's list..
  public editfriendlist=(data)=>{
    this.socket.emit('Editfriendlist',data);
  }

  //Listening friend's edited list..
  public listeneditfriendlist = () => {
    return Observable.create((observer) => {
      this.socket.on('friendeditedlist', (data) => {
        observer.next(data);
      })
    })
  }

  //Listening friend's real time todolist after deleted/edited by friend..
  public listenfriendfinalcall = () => {
    return Observable.create((observer) => {
      this.socket.on('finalcall', (data) => {
        observer.next(data);
      })
    })
  }

  public disconnect = (data) => {
    this.socket.emit('Disconnect',data);
  }

}
