import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment'
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  url=`http://127.0.0.1:8000/api/`;
  constructor(private http:HttpClient) { }
  public user:any;
  ngOnInit(): void {
    this.http.get(environment.urlapi+'user',{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res => {
      console.log(res)
      this.user=res;
      
    });
  }
  phone=faPhone;
  address=faAddressCard;
  mail=faMailBulk;
}
