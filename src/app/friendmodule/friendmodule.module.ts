import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetfriendsComponent } from './getfriends/getfriends.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { FriendrequestsentComponent } from './friendrequestsent/friendrequestsent.component';
import { FriendrequestreceivedComponent } from './friendrequestreceived/friendrequestreceived.component';
import { FriendalltodolistComponent } from './friendalltodolist/friendalltodolist.component';
import { FriendsingleviewtodolistComponent } from './friendsingleviewtodolist/friendsingleviewtodolist.component';
import { FriendtodolisteditComponent } from './friendtodolistedit/friendtodolistedit.component';
import { AuthverificationService } from '../authverification.service';

@NgModule({
  declarations: [GetfriendsComponent, FriendlistComponent, FriendrequestsentComponent, FriendrequestreceivedComponent, FriendalltodolistComponent, FriendsingleviewtodolistComponent, FriendtodolisteditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'findfriends',component:GetfriendsComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'friendrequestsent/:UserId',component:FriendrequestsentComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'friendrequestreceived/:UserId',component:FriendrequestreceivedComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'myfriendlist/:UserId',component:FriendlistComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'Friendalltodolist/:friendname/:FriendId',component:FriendalltodolistComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'Friendtodolistedit/:FriendId/:ListId',component:FriendtodolisteditComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'Friendsingleviewtodolist/:FriendId/:ListId',component:FriendsingleviewtodolistComponent,canActivate:[AuthverificationService],pathMatch:'full'}
    ])
  ]
})
export class FriendmoduleModule { }
