import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { cart, order } from 'src/app/admin/product';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html',
  styleUrls: ['./myOrders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userid = sessionStorage.getItem("userId");
  orderData: any = [];
  orderTotalAmount: any;

  cartOrderList: cart[] | undefined;

  constructor(private cartService: CartService, private http: HttpClient, private title:Title) { }

  ngOnInit() {
    if (sessionStorage.getItem('shippingData')) {
      sessionStorage.removeItem('shippingData');
    }
    this.cartService.ordersData(this.userid).subscribe((data: any) => {
      let orderDetails = data;

      orderDetails.forEach((orderDatas: any) => {
        let cartData = orderDatas.cartItems;

        cartData.forEach((cart: any) => {
          this.http.get(`http://localhost:3000/orderStatusUpdate?orderid=${cart.orderUniqueId}`).subscribe((response: any) => {
            let status = response[0].status;
            let orderStatus = {
              ...cart,
              orderStatus: status
            }
            this.orderData.push(orderStatus);            
          })
        });
      });

      if (this.orderData.length == 0) {
        setTimeout(() => {
          const offerData: any = document.querySelector('.popupMsg');
          offerData.showModal();
        }, 3000);
      }
    });

    this.title.setTitle('My Orders | RK MART');
  }

  cancelOrder(orderId: any, productId:any, quantity:any) {
    if (confirm("Are you Sure you Want to Cancel Order")) {
      let orderDatas;
      let id;
      this.http.get(`http://localhost:3000/orderStatusUpdate?orderid=${orderId}`).subscribe((data: any) => {
        orderDatas = data;
        id = orderDatas[0].id;

        this.http.patch(`http://localhost:3000/orderStatusUpdate/${id}`, { status: "Cancelled" }).subscribe((res) => {
          if (res) {
            alert("Cancelled Successfully");
          }
        });

        this.http.get(`http://localhost:3000/Productdata/${productId}`).subscribe((data: any) => {

          let updatedData = {
            ...data,
            Stock: data.Stock + quantity
          }
          this.http.patch(`http://localhost:3000/Productdata/${productId}`, updatedData).subscribe();
          
        });
      });
    }
  }

  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }
}