import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/service/product/product.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() comp1Out = new EventEmitter();
  public product=[];
  constructor(private productserv:ProductService,private http:HttpClient) { }
  productinCart=[];
  temp:any;
  details:any;
  url=`http://127.0.0.1:8000/api/`;
  category=[];
  productbycate:any;
  hascate=false;
  p: number = 1;
  collection: any[] = this.product; 
  ngOnInit(): void {
    this.productserv.getlistproduct().subscribe(data=>{
      this.product=Array.from(Object.keys(data),k=>data[k]);
    });
    this.productserv.getlistcategory().subscribe(item=>{
      this.category=Array.from(Object.keys(item),i=>item[i])
    });
  }
  signin=faUserAlt  ;
  regis=faUserCircle;
  cart=faCartArrowDown;
  Addtocart(productid){
    this.http.get(this.url+'product-detail/'+productid).subscribe(
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
  probycate(category){
    this.http.get(this.url+'product-cate/'+category).subscribe(
      res => {
        console.log(res)
        this.productbycate=res;
        this.hascate=true;
      });
  }
}
