import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../adminProducts.service';
import { product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProductAmount:number=0;
  salesAmount:number=0;
  allUser: any = "";
  allProducts: product[] = [];
  categoryCount:any="";

  constructor(private user: AdminProductsService) {
    this.user.getUsers().subscribe(user => this.allUser = user);
    this.user.getProducts().subscribe(product => this.allProducts = product as product[]);
    this.user.categoryTypesCount().subscribe( (category) => this.categoryCount = category);
    this.user.productTotalAmount().subscribe((totalAmount:number) => {
      this.totalProductAmount = totalAmount;
    });
  }

  ngOnInit() {}
}
