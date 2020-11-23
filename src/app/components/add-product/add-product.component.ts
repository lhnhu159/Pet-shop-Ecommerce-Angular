import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public category=[];
  public brand=[];
  seletedFile:any;
  public success=false;
  public brandbycate:any; 
  public errqty=false;
  constructor(public productserv:ProductService,private http:HttpClient) { }
  ngOnInit(): void {
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
    this.productserv.getlistbrand().subscribe(item=>{
      this.brand=Array.from(Object.keys(item),i=>item[i])
    });
  }
  onfileSelectect(event){
    this.seletedFile=<File>event.target.files[0];
    console.log(this.seletedFile);
  }
  Createproduct(data){
    var formData = new FormData();
    formData.append('product_image',this.seletedFile,this.seletedFile.name);  
    formData.append('product_name',data.product_name);
    formData.append('description',data.description);
    formData.append('price',data.price);
    formData.append('quantity',data.quantity);
    formData.append('brand_id',data.brand_id);
    formData.append('category_id',data.category_id);
    this.http.post(environment.urlapi+'product',formData,
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
    res => {
      console.log(res)
      this.success=true
      window.location.replace('/admin/product')
    },
    err=>{
      console.log(err)
    }
    );
  }
  selectCate(category){
    this.productserv.brandbycate(category).subscribe(
      res=>{
        this.brandbycate=res;
        console.log(res)
      }
    )
  }
  ktquantity(event){
    if(event<0){
      this.errqty=true;
    }
    else{
      this.errqty=false;
    }
  }

}
