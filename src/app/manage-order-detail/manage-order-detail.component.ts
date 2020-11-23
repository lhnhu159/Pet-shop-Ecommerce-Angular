import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.css']
})
export class ManageOrderDetailComponent implements OnInit {
  public product:any;
  public detail;
  constructor(private getorder:ProductService) { }

  ngOnInit(): void {
    this.getorder.getlistproduct().subscribe(data=>{
      this.product=Array.from(Object.keys(data),k=>data[k]);
    });
  }

}
