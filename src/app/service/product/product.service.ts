import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment'
const httpOptions={
  headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
};
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  mycart = new Subject<any>();
  constructor(private http:HttpClient,private router:Router) { }
  url=`http://127.0.0.1:8000/api/`;
  getlistproduct(){
    return this.http.get(this.url+'product-list');
  }
  getlistcategory(){
    return this.http.get(this.url+'category-list');
  } 
  getlistbrand(){
    return this.http.get(this.url+'brand-list');
  }
  addProduct(product){
    return this.http.post<any>(this.url+'product',product,httpOptions);
  }
  getlistorder(){
    return this.http.get(environment.urlapi+'order',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  getlistmethod(){
    return this.http.get(environment.urlapi+'method-list');
  }
  getliststatus(){
    return this.http.get(environment.urlapi+'status-list');
  }
  getorderdetail(user,order_id){
    return this.http.post(environment.urlapi+'order-detail',{user:user,order_id:order_id},{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  getorderbyid(order){
    return this.http.get(environment.urlapi+'order-id/'+order,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  updatestatusorder(order_id,status){
    return this.http.put(environment.urlapi+'order/'+order_id,{status:status},
    {headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  getorderbyuser(){
    return this.http.get(environment.urlapi+'list-order-user',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  getuser(){
    return this.http.get(environment.urlapi+'user',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  productbybrand(brand_id){
    return this.http.get(environment.urlapi+'product-brand/'+brand_id);
  }
  brandid(brand){
    return this.http.get(environment.urlapi+'brand-id/'+brand);
  }
  searchpro(product){
    return this.http.post(environment.urlapi+'search-product',{product_name:product});
  }
  listuser(){
    return this.http.get(environment.urlapi+'user-list',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  productdetail(product){
    return this.http.get(environment.urlapi+'product-detail/'+product);
  }
  brandbycate(cate){
    return this.http.get(environment.urlapi+'brandbycate/'+cate);
  }
  confirm(email){
    return this.http.get(environment.urlapi+'register/verify/'+email,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
  get_cate(id){
    return this.http.get(environment.urlapi+'product-cate/'+id);
  }
  resend(){
    return this.http.get(environment.urlapi+'resend',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
  }
}
