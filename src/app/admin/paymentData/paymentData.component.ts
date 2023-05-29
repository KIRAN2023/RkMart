import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paymentData',
  templateUrl: './paymentData.component.html',
  styleUrls: ['./paymentData.component.css']
})
export class PaymentDataComponent implements OnInit {
  paymentInfo:any=""
  constructor(private http:HttpClient ,private title:Title) {
    this.http.get('http://localhost:3000/payments').subscribe((data)=>{
      this.paymentInfo = data;
    })
   }

  ngOnInit() {
    this.title.setTitle('Payments | RK MART');
  }

}
