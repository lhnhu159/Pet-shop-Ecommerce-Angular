import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
import { ProductService } from '../service/product/product.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  confirmEmail:FormGroup;
  isSubmitted  =  false;
  isSubmittedcode  =  false;
  hasCode=false;
  constructor(private auth:AuthService,private router:Router,private formBuilder: FormBuilder,private serv:ProductService) { }

  ngOnInit(): void {
    this.registerForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.confirmEmail  =  this.formBuilder.group({
    code: ['', Validators.required],
});
  }
  get formControls() { return this.registerForm.controls; }
  get formControls1() { return this.confirmEmail.controls; }
  registerUser(){
    this.isSubmitted=true;
    if(this.registerForm.invalid){
      return;
    }
    this.hasCode=true;
    this.auth.registerUser(this.registerForm.value).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('name',res.auth.name)
      },
      err => {
        alert('Register is failed');
      }
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
          alert('Register successfully')
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
