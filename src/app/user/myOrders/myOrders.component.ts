import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { cart } from 'src/app/admin/product';
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

  constructor(private cartService: CartService, private http: HttpClient, private title: Title) { }

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
            let delivery = response[0].delivery;
            let orderId = response[0].id;
            let orderStatus = {
              ...cart,
              orderStatus: status,
              delivery: delivery,
              orderDate: response[0].orderDate
            }

            let dateNow: Date = new Date();
            let deliveryData = dateNow.toLocaleDateString();
            
            if (response[0].delivery == deliveryData && dateNow.getHours() > 12) {
              this.http.patch(`http://localhost:3000/orderStatusUpdate/${orderId}`, { deliveryDeadline: true }).subscribe(() =>{
                orderStatus.deliveryDeadline = true; 
                this.orderData.push(orderStatus);
                console.log(orderStatus);   
              });
            }else{
              this.http.patch(`http://localhost:3000/orderStatusUpdate/${orderId}`, { deliveryDeadline: false }).subscribe(() =>{
                orderStatus.deliveryDeadline = false; 
                this.orderData.push(orderStatus);
                console.log(orderStatus); 
              });
            }
          });
        });
      });



      if (this.orderData.length == 0) {
        // setTimeout(() => {
        //   const offerData: any = document.querySelector('.popupMsg');
        //   offerData.showModal();
        // }, 3000);
      }
    });

    this.title.setTitle('My Orders | RK MART');
  }

  cancelOrder(orderId: any, productId: any, quantity: any, date: any) {
    let dateNow: Date = new Date();
    let deliveryData = dateNow.toLocaleDateString();   

    if( deliveryData!=date || (deliveryData == date && dateNow.getHours()<12)){
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
    }else{
      alert("Order Out For Delivery You Cannot Cancel Order");
    }
    
  }

  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }
}