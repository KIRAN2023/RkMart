import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/user/cart.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAmount: number = 0;
  data: any = "";
  retrivedStocks: any = []
  constructor(private cartService: CartService, private http: HttpClient, private title: Title) { }

  ngOnInit() {
    this.paymentAmount = this.cartService.getProductTotalAmount();

    this.title.setTitle('Payment | RK MART');
    this.data = sessionStorage.getItem("shippingData");
    this.data = JSON.parse(this.data);
  }

  paymentModal() {

    this.data.cartItems.forEach((product:any)=>{
      this.http.get(`http://localhost:3000/Productdata/${product.productid}`).subscribe((data:any)=>{
       let updatedData = {
        ...data,
        Stock:data.Stock - product.quantity
       }
       this.http.put(`http://localhost:3000/Productdata/${product.productid}`,updatedData).subscribe();
      });
    })

    this.cartService.order(this.data).subscribe();
  
    let paymentModal:any = document.querySelector(".paymentModal");
    paymentModal.showModal();
  }
}