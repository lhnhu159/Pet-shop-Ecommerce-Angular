import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';


@Component({
  selector: 'app-del-product',
  templateUrl: './del-product.component.html',
  styleUrls: ['./del-product.component.css']
})
export class DelProductComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,private productserv:ProductService,private router:Router) {}
  public id_product:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_product = Number.parseInt(params['id']);
    });
    this.http.delete('http://127.0.0.1:8000/api/product/'+this.id_product, {headers: {'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(
      res => {
        console.log(res)
        alert('Product is removed')
        this.router.navigate(['/admin/product'])
      });
  }

}
