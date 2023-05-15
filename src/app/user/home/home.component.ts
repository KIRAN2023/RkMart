import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsDataService } from 'src/app/user/productsData.service';

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

  public myMath = Math;
  constructor(private data: ProductsDataService, private http: ProductsDataService, private titleService: Title) {

  }
  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }

  ngOnInit() {
    this.data.getProducts().subscribe(product => this.products = product)
    this.titleService.setTitle('Home | RK MART');

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

    // setTimeout(function pop(){
    //   const $offerData:any = document.querySelector('.popupMsg');
    //   $offerData.showModal();
    // },3000);

  }
}

