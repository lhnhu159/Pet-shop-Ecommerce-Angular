import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faDatabase} from '@fortawesome/free-solid-svg-icons';
import {faStore} from '@fortawesome/free-solid-svg-icons';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private getlist:ProductService) { }
  listuser:any;
  user=0;
  product=0;
  listproduct:any;
  total=0;
  listorder:any;
  order=0;
  ngOnInit(): void {
    this.getlist.getlistproduct().subscribe(
      res=>{
        console.log(res),
        this.listproduct=res
        for(let i in this.listproduct){
          this.product=this.product+Number(this.listproduct[i]['quantity']);
        }
      }
    )
    this.getlist.getlistorder().subscribe(
      res=>{
        console.log(res),
        this.listorder=res,
        this.order=this.listorder.length
        for(let i in this.listorder){
          this.total=this.total+Number(this.listorder[i]['total']);
        }
      }
    )
    this.getlist.listuser().subscribe(
      res=>{
        console.log(res),
        this.listuser=res,
        this.user=this.listuser.length
      }
    )
  }
  database=faDatabase;
  user1=faUserAlt;
  bill=faMoneyBill;
  pro=faStore;
}
