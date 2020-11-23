import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
import { ProductService } from '../service/product/product.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth:AuthService,private router:Router,private formBuilder: FormBuilder,private serv:ProductService) { }
  loginForm: FormGroup;
  confirmEmail:FormGroup;
  isSubmitted  =  false;
  isSubmittedcode  =  false;
  hasconfirm=false;
  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.confirmEmail  =  this.formBuilder.group({
    code: ['', Validators.required],
});
  }
  get formControls() { return this.loginForm.controls; }
  get formControls1() { return this.confirmEmail.controls; }
  LoginUser(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.auth.loginUser(this.loginForm.value).subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token',res.token)
        localStorage.setItem('name',res.auth.name)
        localStorage.setItem('role',res.auth.role);
        if(res.auth.confirmed==0){
          this.hasconfirm=true;
          return;
        }
        alert('Login successfully')
        if(res.auth.role=='1'){
          window.location.replace('/admin/dashboard');
        }
        else{
          window.location.replace('/home')
        }  
      },
      err => alert('Email or password was wrong!')
    )
  }
  confirm(){
    this.isSubmittedcode=true;
    if(this.confirmEmail.invalid){
      return;
    }
    this.serv.confirm(this.confirmEmail.value.code).subscribe(
      res=>{
        console.log(res);
        if(res=='true'){
          alert('Login successfully')
          window.location.replace('/home')
        }        
      },
      err=>{
        alert('Xac thuc khong thanh cong, nhap lai')
      }
    )
  }
  Resend(){
    this.serv.resend().subscribe(
      res=>{
        console.log(res);
        alert('Ma da duoc gui lai');
      }
    )
  }
  back(){
    this.auth.logoutUser();
    window.location.replace('/home')
  }
}
