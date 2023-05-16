import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cart, order } from 'src/app/admin/product';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html',
  styleUrls: ['./myOrders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userid = sessionStorage.getItem("userId");
  orderData:any = [];
  orderTotalAmount: any;

  cartOrderList: cart[] | undefined;

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit() {
    this.cartService.ordersData(this.userid).subscribe((data: any) => {
      let orderDetails = data;

      orderDetails.forEach((orderDatas: any) => {
        let cartData = orderDatas.cartItems;

        cartData.forEach((cart: any) => {
          this.http.get(`http://localhost:3000/orderStatusUpdate?orderid=${cart.orderUniqueId}`).subscribe((response: any) => {
            let orderStatus = {
              ...cart,
              orderStatus: response[0].status
            }
            this.orderData.push(orderStatus);
            console.warn(this.orderData);
            
          })
        })
      });
    });
  }
}
