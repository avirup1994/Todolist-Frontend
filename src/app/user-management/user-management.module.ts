import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [SignupComponent, ForgotpasswordComponent, UpdatepasswordComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'signup',component:SignupComponent,pathMatch:'full'},
      {path:'forgot',component:ForgotpasswordComponent,pathMatch:'full'},
      {path:'update',component:UpdatepasswordComponent,pathMatch:'full'},
      {path:'logout',component:LogoutComponent,pathMatch:'full'},
    ])
  ]
})
export class UserManagementModule { }
