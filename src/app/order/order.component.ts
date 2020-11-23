import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ProductService } from '../service/product/product.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart:any;
  getcart=[];
  total=0;
  hasStripe=false;
  paymentmethod=false;
  email:any;
  nameship:any;
  address:any;
  phone:any;
  note:"";
  kq=false;
  order:any;
  id_order:any;
  valuemethod:any;
  public user:any;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
  constructor(private fb: FormBuilder, private stripeService: StripeService,private http:HttpClient,private getus:ProductService) { }
  orderForm: FormGroup;
  isSubmitted  =  false;
  ngOnInit(): void {
    this.orderForm  =  this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      note:""
  });
    this.cart=JSON.parse(localStorage.getItem('cart'));
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    for(let i in this.cart){
      let price=Number(this.cart[i]['price'])*Number(this.cart[i]['quatity']);
      this.total=this.total+price;

    }
    this.getus.getuser().subscribe(
      res=>{
        console.log(res);
        this.user=res;
      }
    );
  }
  get formControls() { return this.orderForm.controls; }
  
  OrderInfo(){
    this.isSubmitted=true;
    if(this.orderForm.invalid){
      return;
    }
    this.nameship=this.orderForm.value.name;
    this.note=this.orderForm.value.note;
    this.phone=this.orderForm.value.phone;
    this.email=this.orderForm.value.email;
    this.address=this.orderForm.value.address;
    this.paymentmethod=true;
  }
  Payment(){
    const name = this.stripeTest.get('name').value;
    let pay=this.total/23000;
    this.stripeService
      .createToken(this.card.element,{name})
      .subscribe((result) => {
        if (result.token.id) {
          this.http.post(environment.urlapi+'stripe',{token:result.token.id,total:pay.toFixed(1)},{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
          res => {
            console.log(res);
              var formData = new FormData();
              formData.append('total',String(this.total));  
              formData.append('name',this.nameship);
              formData.append('email',this.email);
              formData.append('note',this.note);
              formData.append('address',this.address);
              formData.append('phone',this.phone);
              formData.append('status','3');
              formData.append('payment_method','2');
              formData.append('name_card',name);
              this.http.post(environment.urlapi+'order',formData,{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
              res => {
              this.order=res;
              this.id_order=this.order.order_id;
              for(let i in this.cart){
                this.http.post(environment.urlapi+'cart',{product_id:this.cart[i]['id'],amount:this.cart[i]['quatity'],price:this.cart[i]['price'],order_id:this.id_order},
                {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
                  res1 => {
                    console.log(res1)
                  });
              }
              localStorage.removeItem('cart');
              alert('Thanh toan thanh cong');
              window.location.replace('/order-user')
            },
            err=>{
              console.log(err)
            }
            );
    },
    err=>{
      console.log(err)
    }
    );
          console.log(result);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
      
  }
  chooseMethod(value){
    if(value==2){
      this.hasStripe=true;
      this.valuemethod=value;
    }
    else{
      this.hasStripe=false;
      this.valuemethod=value;
    }
  }
  Paynomal(){
    var formData = new FormData();
        formData.append('total',String(this.total));  
        formData.append('name',this.nameship);
        formData.append('email',this.email);
        formData.append('note',this.note);
        formData.append('address',this.address);
        formData.append('phone',this.phone);
        formData.append('status','1');
        formData.append('payment_method','1');
      this.http.post(environment.urlapi+'order',formData,{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        this.order=res;
        this.id_order=this.order.order_id;
        this.kq=true;
        for(let i in this.cart){
          this.http.post(environment.urlapi+'cart',{product_id:this.cart[i]['id'],amount:this.cart[i]['quatity'],price:this.cart[i]['price'],order_id:this.id_order},{headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
            res1 => {
              console.log(res1)
            });
        }
        alert('Dat hang thanh cong'),
        localStorage.removeItem('cart');
        window.location.replace('/order-user')
      },
      err=>{
        console.log(err)
      }
      );
  }
}
