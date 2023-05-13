import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
  orderData:any="";

  constructor(private http:HttpClient){
    this.http.get('http://localhost:3000/orders').subscribe((orderData)=>{
      this.orderData = orderData;
    })
  }
}
