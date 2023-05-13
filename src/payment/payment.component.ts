import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAmount:number=0;
  data:any="";
  constructor(private cartService:CartService, private title:Title) { }

  ngOnInit() {
    this.paymentAmount = this.cartService.getProductTotalAmount();

    this.title.setTitle('Payment | RK MART');
    this.data = sessionStorage.getItem("shippingData");
    this.data = JSON.parse(this.data);
  }

  paymentModal(){
    this.cartService.order(this.data).subscribe((response)=>{
      console.warn(this.data);
      
      response?alert("order Placed Successfully"):alert("Error while placing order");
    });
    let paymentModal:any = document.querySelector(".paymentModal");
    paymentModal.showModal();
  }

}
