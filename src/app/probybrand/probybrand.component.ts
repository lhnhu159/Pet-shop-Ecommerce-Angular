import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../components/product/product.component';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-probybrand',
  templateUrl: './probybrand.component.html',
  styleUrls: ['./probybrand.component.css']
})
export class ProbybrandComponent implements OnInit {
  brand:any;
  brand_id:any;
  productbybrand:any;
  brandname="";
  p: number = 1;
  collection: any[] = this.productbybrand;
  public details:any;
  public productinCart=[];
  public getbrand:any;
  constructor(private productserv:ProductService,private route:ActivatedRoute,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.productserv.getlistbrand().subscribe(item=>{
      this.brand=Array.from(Object.keys(item),i=>item[i])
    });
    this.route.params.subscribe(params => {
      this.brand_id= Number.parseInt(params['id']);
    });
    this.productserv.productbybrand(this.brand_id).subscribe(
      res=>{
        this.productbybrand=Array.from(Object.keys(res),k=>res[k]);
        console.log(this.productbybrand)
      }
    )
    this.productserv.brandid(this.brand_id).subscribe(
      res=>{
        this.getbrand=res;
        this.brandname=this.getbrand.brand_name
      }
    )
  }
  probybrand(brandid){
    this.router.navigate(['/productbybrand/'+brandid]);
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
