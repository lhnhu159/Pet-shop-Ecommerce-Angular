import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public successcate=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  Addcategory(value){
    this.http.post(environment.urlapi+'category',{category_name:value.category_name},
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
    res => {
      console.log(res)
      this.successcate=true
      window.location.replace('/admin/category')
    },
    err=>alert('Create category is failed')
    );

  }
  
}
