import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product/product.service'
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productserv:ProductService,private http:HttpClient) { }
  public product=[];
  public category=[];
  public product_id:any;
  p: number = 1;
  collection: any[] = this.product;
  brand: any;
  ngOnInit(): void {
    this.productserv.getlistproduct().subscribe(data=>{
      this.product=Array.from(Object.keys(data),k=>data[k]);
      console.log(data);
    });
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
    this.productserv.getlistbrand().subscribe(
      res=>{
        this.brand=res;
      }
    )
  }
  faEdit = faEdit;
  faTrashAlt=faTrashAlt;
  onEditproduct(product){
    console.log(product);
  }
  deleteProduct(product){
    this.http.delete(environment.urlapi+'product/'+product,
     {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        alert("Delete product successfully"),
        window.location.reload()
      });
  }
}
