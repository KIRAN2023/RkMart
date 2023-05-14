import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-productDescription',
  templateUrl: './productDescription.component.html',
  styleUrls: ['./productDescription.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  public myMath = Math;

  allProducts: any;
  requiredProduct: string | null | undefined;
  finalProduct: any;
  userLoggedin: boolean | undefined = this.productDataService.userLogin;

  categoryData: string | null = "";
  featuredProducts: any = [];

  removeProduct: boolean = false;
  removeCartProduct: cart | null | undefined;
  pid: number | string | undefined;

  constructor(private productDataService: ProductsDataService, private cartService: CartService, private route: ActivatedRoute, private titleService: Title) {
    this.userLoggedin = Boolean(sessionStorage.getItem("userLoggedIn")) || this.productDataService.userLogin;
    this.productDataService.userLogin = this.userLoggedin;
    this.route.paramMap.subscribe(urlData => {

      this.productDataService.getProducts().subscribe(product => {
        this.allProducts = product;

        this.requiredProduct = urlData.get('productID');
        this.removeProduct = false;

        this.finalProduct = this.allProducts.find((product: product) => product.id == this.requiredProduct);

        this.cartService.getUsersCartList(sessionStorage.getItem("userId"));
        this.loadFeaturedProducts();
        this.cartData();

        this.titleService.setTitle(`${this.finalProduct?.title} | RK MART`);
      });
    });
  }

  ngOnInit(): void { 
  }

  loadFeaturedProducts() {
    let index = 0;
    this.featuredProducts = [];
    for (let product of this.allProducts) {
      if (this.finalProduct.category == product.category && (this.finalProduct.id != product.id && index <= 3)) {
        index++;
        this.featuredProducts.push(product);
      }
    }
  }

  cartData() {
    let productFound:boolean|undefined=false;
    this.cartService.getProducts().subscribe((products: any) => {
      products.filter((product: any) => {
        if (product.productid == this.requiredProduct) {
          this.removeCartProduct = product;
          this.removeProduct = true;
          productFound = true;
        }
      });
    });
    !productFound?this.removeProduct=false:this.removeProduct;
  }

  loginStatusData(loginData: boolean) {
    this.cartService.getUsersCartList(sessionStorage.getItem("userId"));
    this.cartData();
    this.userLoggedin = loginData;
  }

  addtoCartData() {
    if (this.productDataService.userLogin) {
      
      let uid = sessionStorage.getItem('userId');
      let dataToCart: cart = {
        productName: this.finalProduct.productName,
        title: this.finalProduct.title,
        image: this.finalProduct.image,
        productUniqueId: this.finalProduct.uniqueId,
        quantity: 1,
        originalAmount: this.finalProduct.originalAmount,
        productid: this.finalProduct.id,
        uid,
        id: undefined
      }
      delete dataToCart.id;

      this.cartService.addToCart(dataToCart)?.subscribe((res: any) => {
        if (res) {
          alert(`${dataToCart.title} Added to the Cart`);
          this.removeProduct = true;
        } else {
          alert("error");
        }
      });
    } else {
      alert("Login to add product to Cart");
    }
  }

  deleteFromCart() {
    this.cartService.removeProduct(this.removeCartProduct!, sessionStorage.getItem('userId'))?.subscribe();
    this.removeProduct = false;
  }
  
}