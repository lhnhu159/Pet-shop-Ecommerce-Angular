import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor(private getorder: ProductService) { }
  public order: any;
  public method: any;
  public status: any;
  public product: any;
  public detail;
  public orderbyid: any;
  public total=0;
  hasdetail = false;
  public valuestatus = "";
  p: number = 1;
  collection: any[] = this.order;
  ngOnInit(): void {
    this.getorder.getlistorder().subscribe(
      res => {
        console.log(res)
        this.order = res
      });
    this.getorder.getliststatus().subscribe(
      res => {
        console.log(res)
        this.status = res;
      });
    this.getorder.getlistmethod().subscribe(
      res => {
        console.log(res)
        this.method = res
      });
    this.getorder.getlistproduct().subscribe(data => {
      this.product = Array.from(Object.keys(data), k => data[k]);
    });
  }
  view = faInfo;
  viewdetail(order, user) {
    this.hasdetail = true;
    this.getorder.getorderdetail(user, order).subscribe(
      res => {
        this.detail = res;
      });
    this.getorder.getorderbyid(order).subscribe(
      res1 => {
        console.log(res1);
        this.orderbyid = res1;
        if(this)
        this.total = this.orderbyid.total;
      });
  }
  changestatus(value) {
    this.valuestatus = value;
  }
  Updatestatus(orderid) {
    if (this.valuestatus !="") {
      this.getorder.updatestatusorder(orderid,this.valuestatus).subscribe(
        res => {
          console.log(res);
          alert('Cap nhat trang thai thanh cong');
          window.location.reload();
        });
    }
  }

}
