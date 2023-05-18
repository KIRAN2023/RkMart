import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { product } from 'src/app/admin/product';
import { CartService } from 'src/app/user/cart.service';

import { ProductsDataService } from 'src/app/user/productsData.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public myMath = Math;

  productDataFound:any;

  productsData: product[] = [];
  requiredProduct: string | null | undefined = "";
  searchData: string = "";
  productFound: boolean = true;
  updatedProducts: product[] = [];

  categoryData: string | undefined | null;

  constructor(private data: ProductsDataService, private cartService: CartService, private titleService: Title, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe((urlData) => {
      this.categoryData = urlData.get('category');
    });

    if (this.categoryData) {
      this.data.getProducts().subscribe((productData: any) => {
        this.activeRoute.paramMap.subscribe((urlData: ParamMap) => {

          this.productsData = productData;
          this.requiredProduct = urlData.get('category');
          this.titleService.setTitle(`${this.requiredProduct?.charAt(0)?.toUpperCase()}${this.requiredProduct?.slice(1)}  | RK MART`);

          this.updatedProducts = this.productsData.filter((product: any) => product.category == this.requiredProduct);
        });
      });
    } else {
      this.data.getProducts().subscribe((productData: any) => {
        this.updatedProducts = productData;
      });
    }
  }


  addtoCartData(productAddtoCart: any, productID: any) {
    if (this.data.userLogin) {
      this.cartService.addToCart(productAddtoCart);
    } else {
      alert("Login to add product to Cart");
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Products | RK MART');
  }
}


