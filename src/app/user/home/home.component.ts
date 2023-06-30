import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsDataService } from 'src/app/user/productsData.service';
import { OfferTimerComponent } from '../offerTimer/offerTimer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popUp: any;
  products: any = "";

  groceryProduct: any = [];
  beveragesProduct: any = [];
  householdProduct: any = [];

  offerApply:any;
  offerEnd:Date = new Date();

  public myMath = Math;
  constructor(private data: ProductsDataService, private productService:ProductsDataService, private http: ProductsDataService, private titleService: Title) {
    this.offerApply = sessionStorage.getItem("offerApply");
  }
  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }

  ngOnInit() {
    this.data.getProducts().subscribe(product => this.products = product)
    this.titleService.setTitle('Home | RK MART');

    this.checkPopUp();


    this.data.getProducts().subscribe((productData: any) => {
      for (let product of productData) {
        if (product.category == "grocery") {
          this.groceryProduct.push(product);
        }
        if (product.category == "beverages") {
          this.beveragesProduct.push(product);
        }
        if (product.category == "household") {
          this.householdProduct.push(product);
        }
      }
    });
  }

  checkPopUp() {
   let result = sessionStorage.getItem('offerApply');
    if (result=='true') {
      setTimeout(function pop() {
        const $offerData: any = document.querySelector('.popupMsg');
        $offerData.showModal();
      }, 3000);
    }
  }
}

