import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
  orderData: any = [];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/orders').subscribe((orderData: any) => {

      let orderDatas = orderData;

      orderDatas.forEach((orderDatas: any) => {
        let cartData = orderDatas.cartItems;

        cartData.forEach((cart: any) => {
          this.http.get(`http://localhost:3000/orderStatusUpdate?orderid=${cart.orderUniqueId}`).subscribe((response: any) => {
            let orderStatus = {
              ...cart,
              customerName: orderDatas.customerName,
              customerAddress: orderDatas.customerAddress,
              orderStatus: response[0].status
            }
            this.orderData.push(orderStatus);
          })
        })
      });
    });
  }
}
