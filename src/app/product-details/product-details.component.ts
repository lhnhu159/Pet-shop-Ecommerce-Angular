import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private productserv:ProductService,private route:ActivatedRoute,private http:HttpClient) { }
  url=`http://127.0.0.1:8000/api/`;
  id_product:any;
  public prodetails:any;
  public inputnumber:number=1;
  i=1;
  productinCart=[];
  
  cate_id:any;
  cate:any;
  p: number = 1;
  collection: any[] = this.cate; 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_product = Number.parseInt(params['id']);
    });
    this.http.get(this.url+'product-detail/'+this.id_product).subscribe(res => {
      this.prodetails=res
      console.log(this.prodetails)
      this.cate_id=this.prodetails.category_id
      this.productserv.get_cate(this.cate_id).subscribe(
        res=>{this.cate=res;
          for(let i in this.cate){
            if(this.prodetails.product_id==this.cate[i]['product_id']){
              this.cate.splice(Number(i),1);
            } 
          };
        console.log(res)
        })
    });
    console.log(this.inputnumber);
   
  }
  plus(){
    if(this.inputnumber!=this.prodetails.quantity){
      this.inputnumber=this.inputnumber+1;
    }
   
  }
  minus(){
    if(this.inputnumber!=1){
      this.inputnumber=this.inputnumber-1;
    }
   
  }
  Addtocart(){
    if(localStorage.getItem('cart')!==null){
      let kq=false;
      this.productinCart = JSON.parse(localStorage.getItem('cart'));   
      for(let i in this.productinCart){
        if(this.prodetails.product_id==this.productinCart[i]['id']){
          let qty=this.productinCart[i]['quatity']+this.inputnumber;
          console.log(qty);
          let cartpd={id:this.productinCart[i]['id'],name:this.productinCart[i]['name'],quatity:qty,price:this.prodetails.price,
          image:this.prodetails.product_image};
          this.productinCart.splice(Number(i),1);
          this.productinCart.push(cartpd);
          localStorage.setItem('cart', JSON.stringify(this.productinCart));
          kq=true;
          alert('San pham da duoc them vao gio hang!');
        }
        
      }
      if(kq==false){
        let cart={id:this.prodetails.product_id,name:this.prodetails.product_name,quatity:this.inputnumber,
          price:this.prodetails.price,image:this.prodetails.product_image};
        this.productinCart.push(cart);
        localStorage.setItem('cart', JSON.stringify(this.productinCart));
        alert('San pham da duoc them vao gio hang!');
      }
      
    }
    else{
      let cart={id:this.prodetails.product_id,name:this.prodetails.product_name,quatity:Number(this.inputnumber),
      price:this.prodetails.price,image:this.prodetails.product_image};
      this.productinCart.push(cart);
      localStorage.setItem('cart', JSON.stringify(this.productinCart));
      alert('San pham da duoc them vao gio hang!');
    }
  }
  }




