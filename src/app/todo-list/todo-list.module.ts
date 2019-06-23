import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettodolistComponent } from './gettodolist/gettodolist.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CreatetodolistComponent } from './createtodolist/createtodolist.component';
import { EdittodolistComponent } from './edittodolist/edittodolist.component';
import { AdditemsComponent } from './additems/additems.component';
import { AddsubitemsComponent } from './addsubitems/addsubitems.component';
import { AuthverificationService } from '../authverification.service';

@NgModule({
  declarations: [GettodolistComponent, CreatetodolistComponent, EdittodolistComponent, AdditemsComponent, AddsubitemsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'usertodolist/:UserId',component:GettodolistComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'createtodolist/:UserId',component:CreatetodolistComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'edittodolist/:UserId/:ListId',component:EdittodolistComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'additems/:UserId/:ListId',component:AdditemsComponent,canActivate:[AuthverificationService],pathMatch:'full'},
      {path:'addsubitems/:UserId/:ListId',component:AddsubitemsComponent,canActivate:[AuthverificationService],pathMatch:'full'},
    ])
  ]
 
})
export class TodoListModule { }
