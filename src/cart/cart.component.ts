import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthUserGuard } from 'src/app/auth-user.guard';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  product: any = [];
  subtotal: number = 0;

  productQuantityData = 1;

  constructor(private cartService: CartService, private route: Router, private guard: AuthUserGuard, private title: Title) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe((productData: any) => {
      this.product = productData;

      this.subtotal = this.cartService.getProductTotalAmount();
    });
    this.title.setTitle('Cart | RK MART');
  }

  quantityIncrement(id: any) {
    this.productQuantityData = this.cartService.increaseQuantity(id);
  }

  quantityDecrement(id: any) {
    const indexValue = this.cartService.cartProducts.findIndex((cartData:any)=> cartData.id == id );

    if(indexValue!==-1 && this.cartService.cartProducts[indexValue].quantity>1){
      this.productQuantityData = this.cartService.decreaseQuantity(id);
    }
  }

  removeProduct(product: any) {
    this.cartService.removeProduct(product, sessionStorage.getItem('userId')).subscribe();
  }

  clearCart() {
    this.product.forEach((product: any) => {
      this.cartService.clearCart(product.id);
    })
  }

  ngAfterViewChecked() {
    if (!sessionStorage.getItem('userLoggedIn')) {
      this.route.navigate(['home']);
    }
  }
}