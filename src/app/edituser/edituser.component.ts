import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
import { from } from 'rxjs';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  url=`http://127.0.0.1:8000/api/`;
  constructor(private http:HttpClient,private router:Router) { }
  public user:any;
  ngOnInit(): void {
    this.http.get(environment.urlapi+'user',{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res => {
      console.log(res)
      this.user=res;
    });
  }
  Editpf(value){
    this.http.put(environment.urlapi+'update-user/'+this.user.id,{email:value.email,name:value.name,address:value.address,
      phone:value.phone},{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res => {
      alert('Update user successfully');
      this.router.navigate(['/user']);
    });
  }
}
