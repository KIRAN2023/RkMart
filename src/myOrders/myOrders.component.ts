import { Component, OnInit } from '@angular/core';
import { cart, order } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html',
  styleUrls: ['./myOrders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userid = sessionStorage.getItem("userId");
  orderData:any="";
  orderTotalAmount:any;

  cartOrderList:cart[]|undefined;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.orderData = this.cartService.ordersData(this.userid).subscribe((data:any)=>{
      let orderDetails = data;
      orderDetails.forEach((orderDatas:any) => {
          this.orderData = orderDatas.cartItems;          
      });
    });
  }
}
