import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ContactUsComponent } from '../contactUs/contactUs.component';
import { CartComponent } from '../cart/cart.component';
import { ProductDescriptionComponent } from '../productDescription/productDescription.component';
import { CategoryComponent } from '../category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ErrorComponent } from '../error/error.component';
import { MenuComponent } from '../menu/menu.component';
import { ShippingComponent } from '../shipping/shipping.component';
import { OrderDetailsComponent } from '../orderDetails/orderDetails.component';
import { PaymentComponent } from '../payment/payment.component';
import { MyOrdersComponent } from '../myOrders/myOrders.component';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [																		
      AppComponent,
      HomeComponent,
      ProductsComponent,
      ContactUsComponent,
      CartComponent,
      ProductDescriptionComponent,
      ProductDescriptionComponent,
      CategoryComponent,
      FooterComponent,
      ErrorComponent,
      MenuComponent,
      ShippingComponent,
      OrderDetailsComponent,
      PaymentComponent,
      MyOrdersComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


