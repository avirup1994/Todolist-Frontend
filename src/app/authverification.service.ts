import { Injectable } from '@angular/core';
import { Router,CanActivate ,ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthverificationService implements CanActivate{
  
  constructor(private router:Router,private cookie:CookieService) { }

  canActivate(route: ActivatedRouteSnapshot) : boolean {    
    if (this.cookie.get('authToken') === undefined || this.cookie.get('authToken') === '' || this.cookie.get('authToken') === null)
    {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
}
