import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paymentData',
  templateUrl: './paymentData.component.html',
  styleUrls: ['./paymentData.component.css']
})
export class PaymentDataComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Payments | RK MART');
  }

}
