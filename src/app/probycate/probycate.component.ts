import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product/product.service';
@Component({
  selector: 'app-probycate',
  templateUrl: './probycate.component.html',
  styleUrls: ['./probycate.component.css']
})
export class ProbycateComponent implements OnInit {
  public productbycate=[];
  constructor(private http:HttpClient,private route:ActivatedRoute,private productserv:ProductService,private router:Router) 
  {this.router.routeReuseStrategy.shouldReuseRoute=()=>false;}
  public category_id:any;
  public category:any;
  public catename="";
  public cate:any;
  public details:any;
  public productinCart=[];
  p: number = 1;
    collection: any = this.productbycate; 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category_id= Number.parseInt(params['id']);
    });
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
    this.http.get(environment.urlapi+'product-cate/'+this.category_id).subscribe(
      res => {
        console.log(res)
        this.productbycate=Array.from(Object.keys(res),k=>res[k]);
      });
      this.http.get(environment.urlapi+'cate-id/'+this.category_id).subscribe(
        res => {
          console.log(res)
          this.cate=res;
          this.catename=this.cate.category_name;
        });
  }
  probycate(category){
    this.router.navigate(['/productbycate/'+category]);
  }
  Addtocart(productid){
    this.http.get(environment.urlapi+'product-detail/'+productid).subscribe(
      res => {
        this.details=res;
        if(localStorage.getItem('cart')!==null){
          let kq=false;
          this.productinCart = JSON.parse(localStorage.getItem('cart'));   
          for(let i in this.productinCart){
            if(this.details.product_id==this.productinCart[i]['id']){
              let qty=this.productinCart[i]['quanlity']+1;
              console.log(qty);
              let cartpd={id:this.productinCart[i]['id'],name:this.productinCart[i]['name'],quatity:qty,price:this.details.price,image:this.details.product_image};
              this.productinCart.splice(Number(i),1);
              this.productinCart.push(cartpd);
              localStorage.setItem('cart', JSON.stringify(this.productinCart));
              kq=true;
              alert('San pham da duoc them vao gio hang!');
            }
            
          }
          if(kq==false){
            let cart={id:this.details.product_id,name:this.details.product_name,quatity:1,price:this.details.price,image:this.details.product_image};
            this.productinCart.push(cart);
            localStorage.setItem('cart', JSON.stringify(this.productinCart));
            alert('San pham da duoc them vao gio hang!');
          }
          

        }
        else{
          let cart={id:this.details.product_id,name:this.details.product_name,quatity:1,price:this.details.price,image:this.details.product_image};
          this.productinCart.push(cart);
          localStorage.setItem('cart', JSON.stringify(this.productinCart));
          alert('San pham da duoc them vao gio hang!');
        }
        console.log(JSON.parse(localStorage.getItem('cart'))[1])
      });
  }
    

}
