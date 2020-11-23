import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  public categorypd=[];
  constructor(private productserv:ProductService,private http:HttpClient) { }
  successbrand=false;
  ngOnInit(): void {
    this.productserv.getlistcategory().subscribe(item=>{
      this.categorypd=Array.from(Object.keys(item),i=>item[i])
    });
  }
  Addbrand(value){
    this.http.post(environment.urlapi+'brand',{brand_name:value.brand_name,category:value.category_id},
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
    res => {
      console.log(res)
      this.successbrand=true
      window.location.replace('/admin/brand')
    },
    err=>alert('Create brand is failed')

    );
  }

}
