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

  constructor(private cartService:CartService, private title:Title) { }

  ngOnInit() {
    this.paymentAmount = this.cartService.getProductTotalAmount();

    this.title.setTitle('Payment | RK MART')
  }

  paymentModal(){
    let paymentModal:any = document.querySelector(".paymentModal");
    paymentModal.showModal();
  }

}
