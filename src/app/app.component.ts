import { Component, OnInit } from '@angular/core';
import {AuthService} from './service/auth/auth.service'
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from './service/product/product.service';
import { Router } from '@angular/router';
import {environment} from '.././environments/environment'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:AuthService,private productserv:ProductService,private router:Router,private http:HttpClient)
  {this.router.routeReuseStrategy.shouldReuseRoute=()=>false;}
  signin=faUserAlt  ;
  regis=faUserCircle;
  cart=faCartArrowDown;
  public category=[];
  public brand=[];
  productinCart:any;
  user:any;
  productsearch:any;
  hasSearch=false;
  name="";
  role=0;
  numcart=0;
  ngOnInit(): void {
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
    this.productserv.getlistbrand().subscribe(item=>{
      this.brand=Array.from(Object.keys(item),i=>item[i])
    });
    if(this.authService.loggedIn()){
      this.http.get(environment.urlapi+'user',{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res => {
        console.log(res)
        this.user=res;
        this.name=this.user.name;
        this.role=this.user.role;
      });
    }
    if(localStorage.getItem('cart')!==null){
      this.productinCart = JSON.parse(localStorage.getItem('cart'));
      this.numcart=this.productinCart.length;
    }
  }
  searchproduct(event){
    if(event!=""){
      this.productserv.searchpro(event).subscribe(
        res=>{
          this.productsearch=res;
          this.hasSearch=true;
        }
      );
    }
    else{
      this.hasSearch=false;
    }
    
  }
  Search(data){
    if(data.search!=""){
      this.productserv.searchpro(data.search).subscribe(
        res=>{
          this.productsearch=res;
          this.hasSearch=true;
        }
      );
    }
    else{
      this.hasSearch=false;
    }
    }
    
}
