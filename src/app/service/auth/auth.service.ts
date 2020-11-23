import { Injectable, ErrorHandler } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable,BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private router:Router,public jwtHelper: JwtHelperService) { }
  
  registerUser(user){
    return this.http.post<any>(environment.urlapi+'register',user);
  }
  loginUser(user){
    return this.http.post<any>(environment.urlapi+'login',user);
  }
  loggedIn():boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin(){
    if (localStorage.getItem('role')=='1'){
      return true;
    }
    else{
      return false;
    }
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('cart');
    window.location.replace('/home');
  }
}
