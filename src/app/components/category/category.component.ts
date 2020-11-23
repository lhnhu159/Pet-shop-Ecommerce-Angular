import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public category=[];
  p: number = 1;
  collection: any[] = this.category;
  constructor(private productserv:ProductService,private http:HttpClient) { }

  ngOnInit(): void {
    this.productserv.getlistcategory().subscribe(data=>{
      this.category=Array.from(Object.keys(data),k=>data[k]);
      console.log(data);
    });
  }
  faEdit = faEdit;
  faTrashAlt=faTrashAlt;
  deleteCategory(category){
    this.http.delete(environment.urlapi+'category/'+category, 
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        alert('Category is removed'),
        window.location.reload()
      });
  }

}
