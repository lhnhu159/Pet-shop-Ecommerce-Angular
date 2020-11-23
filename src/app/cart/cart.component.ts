import { Component, OnInit } from '@angular/core';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductService } from '../service/product/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http:HttpClient,private productserv:ProductService) { }
  cart:any;
  getcart=[];
  total=0;
  hascart=false;
  id_order:any;
  order:any;
  product:any;
  quantity:any;
  url=`http://127.0.0.1:8000/api/`;
  ngOnInit(): void {
    this.cart=JSON.parse(localStorage.getItem('cart'));
    if(this.cart.length>0){
      this.hascart=true;
    }
    for(let i in this.cart){
      let price=Number(this.cart[i]['price'])*Number(this.cart[i]['quatity']);
      this.total=this.total+price;
    }
    console.log(this.total);
  }
  delete=faTrashAlt;
  updateQty(event,id){
    this.productserv.productdetail(id).subscribe(
      res=>{
        this.product=res
        this.quantity=this.product.quantity;
      }
    )
    if(event!='' && event<=this.quantity &&event>0){
      for(let i in this.cart){
        if(id==this.cart[i]['id']){
          let qty=event;
          //console.log(qty);
          //let cartpd={id:this.cart[i]['id'],name:this.cart[i]['name'],quatity:qty,price:this.cart[i]['price'],
          //image:this.cart[i]['image']};
          //this.cart.splice(Number(i),1);
          //this.cart.push(cartpd);
          this.cart[i]['quatity']=qty
          localStorage.setItem('cart', JSON.stringify(this.cart));
        }
      }
    }
    else if(event>this.quantity){
      alert('Nhap qua so luong trong kho');
      return;
    }
    else if(Number(event)<0){
      alert('So luong khong hop le');
      return
    }   
    
  }
  Deleteproduct(cart){
    for(let i in this.cart){
      if(cart==this.cart[i]['id']){
        this.cart.splice(Number(i),1);
      } 
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }
  Removeall(){
    localStorage.removeItem('cart');
    window.location.reload();
  }
  loadCart(){
    window.location.reload();
  }
  Checkout(){
    this.http.post(this.url+'order',{total:this.total},
    {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
    res => {
      this.order=res;
      this.id_order=this.order.order_id;
      for(let i in this.cart){
        this.http.post(this.url+'cart',{product_id:this.cart[i]['id'],amount:this.cart[i]['quatity'],price:this.cart[i]['price'],order_id:this.id_order},
        {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
          res1 => {
            console.log(res1)
          });
      }
      localStorage.removeItem('cart');
      window.location.reload();
    },
    err=>{
      console.log(err)
    }
    );
  }

}
