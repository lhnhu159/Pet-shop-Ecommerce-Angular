import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {
  public orderlist:any;
  public status:any;
  public method:any;
  public product:any;
  hasdetail=false;
  public detail:any;
  public orderbyid:any
  public total=0;
  constructor(private orduser:ProductService) { }

  ngOnInit(): void {
    this.orduser.getorderbyuser().subscribe(
      res => {
        this.orderlist=res;
      });
      this.orduser.getliststatus().subscribe(
        res => {
          this.status = res;
        });
      this.orduser.getlistmethod().subscribe(
        res => {
          this.method = res
        });
      this.orduser.getlistproduct().subscribe(data => {
        this.product = Array.from(Object.keys(data), k => data[k]);
      });
  }
  view = faInfo;
  viewdetail(order,user) {
    this.hasdetail = true;
    this.orduser.getorderdetail(user, order).subscribe(
      res => {
        this.detail = res;
      });
    this.orduser.getorderbyid(order).subscribe(
      res1 => {
        console.log(res1);
        this.orderbyid = res1;
        if(this)
        this.total = this.orderbyid.total;
      });
  }
}
