import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  constructor(private productserv:ProductService,private http:HttpClient,private route:ActivatedRoute) { }
  public brand:any;
  public category=[];
  id_brand:any;
  brand_name:any;
  category_id:any;
  successbrand=false;
  errbrand=false;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_brand = Number.parseInt(params['id']);
    });
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
    this.http.get(environment.urlapi+'brand/'+this.id_brand,
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
     res => {
       this.brand=res
       this.brand_name=this.brand.brand_name
       this.category_id=this.brand.category
     });
 }
 Updatebrand(value){
  this.http.put(environment.urlapi+'brand/'+this.id_brand,{brand_name:value.brand_name,category:value.category_id},
  {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
    res => {
      console.log(res)
      alert('Update brand successfully'),
      window.location.replace('/admin/brand');
    },
    err=>{
      console.log(err)
      this.errbrand=true;
    }
    );
 }
  

}
