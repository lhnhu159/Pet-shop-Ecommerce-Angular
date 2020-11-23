import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../service/product/product.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment'
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  public brandpd=[];
  public categorypd=[];
  p: number = 1;
  collection: any[] = this.brandpd;
  constructor(private productserv:ProductService,private http:HttpClient) { }

  ngOnInit(): void {
    this.productserv.getlistcategory().subscribe(item=>{
      this.categorypd=Array.from(Object.keys(item),i=>item[i])
    });
    this.productserv.getlistbrand().subscribe(item=>{
      this.brandpd=Array.from(Object.keys(item),i=>item[i])
    });
    console.log(this.brandpd);
  }
  faEdit = faEdit;
  faTrashAlt=faTrashAlt;
  deleteBrand(brand){
    this.http.delete(environment.urlapi+'brand/'+brand, 
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        console.log(res),
        window.location.reload()
      });
  }
}
