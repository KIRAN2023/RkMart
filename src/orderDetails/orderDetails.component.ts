import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-orderDetails',
  templateUrl: './orderDetails.component.html',
  styleUrls: ['./orderDetails.component.css']
})
export class OrderDetailsComponent implements OnInit {
  registeredUserData: any = "";
  activeUserData: any = "";
  orderList:any = [];

  subTotal:number=0;
  constructor(private userData:ProductsDataService, private cartService:CartService, private title:Title) { }

  ngOnInit() {
    this.userData.registeredUser().subscribe((data) => {
      this.registeredUserData = data;

      this.registeredUserData.filter((userData: any) => {
        if(userData.mail == sessionStorage.getItem("userMail")){
          this.activeUserData = userData;
        }
      });
    });

    this.subTotal=this.cartService.getProductTotalAmount();
    this.cartService.getProducts().subscribe( (productData) => {
      this.orderList = productData;
    });

    this.title.setTitle('Order Summary | RK MART')

  }
}
