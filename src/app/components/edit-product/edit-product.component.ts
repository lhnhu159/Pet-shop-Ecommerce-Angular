import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  httpOptions={
    headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  };
  public cate=[];
  public brand1:any;
  public product:any;
  public quantity:string;
  public headers = new HttpHeaders();
  seletedFile:any;
  constructor(private http:HttpClient,private route:ActivatedRoute,private productserv:ProductService) { }
  public id_product:any;
  public name:any;
  hasImage=false;
  image:any;
  public successupdate=false;
  public hasbrand=false;
  public choosebrand:any;
  public description='';
  public price='';
  public cate_id=0;
  public brand_id=0;
  ngOnInit(): void {
    //this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
    this.route.params.subscribe(params => {
      this.id_product = Number.parseInt(params['id']);
    });
    this.productserv.getlistcategory().subscribe(item=>{
      this.cate=Array.from(Object.keys(item),i=>item[i])
    });
    this.http.get(environment.urlapi+'product/'+this.id_product, {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        this.product=res;
        this.quantity=this.product.quantity.toString();
        this.name=this.product.product_name;
        this.description=this.product.description;
        this.price=this.product.price;
        this.cate_id=this.product.category_id;
        this.brand_id=this.product.brand_id;
        console.log(this.product)
        this.productserv.brandbycate(this.product.category_id).subscribe(
          res1=>{
            this.brand1=res1;
          }
        )
      });
  }
  onfileSelectect(event){
    if(typeof event=='object'){
      this.seletedFile=<File>event.target.files[0];
      this.hasImage=true;
      var formData = new FormData();
      formData.append('image',this.seletedFile);
      this.http.post(environment.urlapi+'upload',formData).subscribe(
      res => {
        console.log(res),
        this.image=res,
        console.log(this.image)
      });

    }
  }

  editProduct(data){
      if(this.hasbrand==false){
        this.choosebrand=this.brand1[0]['brand_id'];
      }
      else{
        this.choosebrand=data.brand_id;
      }
      this.http.put(environment.urlapi+'product/'+this.id_product,
      {product_name:data.product_name,description:data.description,price:data.price,
      quantity:data.quantity,brand_id:this.choosebrand,category_id:data.category_id,product_image:this.image},
       {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res=>{
        console.log(res)
        this.successupdate=true
        window.location.replace('/admin/product')
      },
      err => {console.log(err),
      alert('Update product is failed')
      }
    )
    
  }
  selectCate(event){
    this.productserv.brandbycate(event).subscribe(
      res=>{
        this.brand1=res;
        console.log(res)
      }
    )
  }
  selectbrand(event){
    this.hasbrand=true;
  }

}
