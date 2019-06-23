import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementModule } from './user-management/user-management.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import {FormsModule} from '@angular/forms';
import { UsermanagementserviceService } from './usermanagementservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { CookieService } from 'ngx-cookie-service';
import { FriendmoduleModule } from './friendmodule/friendmodule.module';
import { ServererrorComponent } from './servererror/servererror.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    ServererrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserManagementModule,
    TodoListModule,
    FriendmoduleModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:NotfoundComponent},
      {path:'**',component:NotfoundComponent},
      {path:'404',component:NotfoundComponent},
      {path:'500',component:ServererrorComponent},

    ])
  ],
  providers: [UsermanagementserviceService,CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
