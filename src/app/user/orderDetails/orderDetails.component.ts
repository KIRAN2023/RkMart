import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShippingService } from 'src/app/shipping.service';
import { CartService } from 'src/app/user/cart.service';
import { ProductsDataService } from 'src/app/user/productsData.service';

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
  data:any=""
  constructor(private userData:ProductsDataService, private shippingService:ShippingService ,private cartService:CartService,private title:Title) { }

  ngOnInit() {
    this.userData.registeredUser().subscribe((data) => {
      this.registeredUserData = data;

      this.registeredUserData.filter((userData: any) => {
        if(userData.mail == sessionStorage.getItem("userMail")){
          this.activeUserData = userData;
        }
      });
    });

    this.cartService.getProducts().subscribe( (productData) => {
      this.orderList = productData;

      this.subTotal=this.cartService.getProductTotalAmount();

    });

    this.title.setTitle('Order Summary | RK MART');
    this.data = sessionStorage.getItem("shippingData");
    this.data =this.data? JSON.parse(this.data):this.shippingService.userShippingData;
  }
}
