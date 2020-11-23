import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./service/auth/auth.service";
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    if(this.auth.loggedIn()&&tokenPayload.role==1){
      return true
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.router.navigate(['login'])
      return false
    }
  }
  
}
