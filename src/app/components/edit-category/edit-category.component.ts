import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { ProductService } from 'src/app/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public cate:any;
  id_cate:any;
  cate_name:any;
  public succupd=false;
  constructor(private http:HttpClient,private productserv:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_cate = Number.parseInt(params['id']);
    });
    this.http.get(environment.urlapi+'category/'+this.id_cate,
     {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        this.cate=res
        this.cate_name=this.cate.category_name;
      });
  }
  Updatecategory(value){
    this.http.put(environment.urlapi+'category/'+this.id_cate,{category_name:value.category_name},
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        console.log(res)
        alert('Update category successfully');
        window.location.replace('/admin/category');
      },
      err=>alert('Update category is failed')
      );
  }
}
