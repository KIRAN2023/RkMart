// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { CartService } from 'src/app/user/cart.service';
// import { firstValueFrom } from 'rxjs';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {

//   paymentAmount: number = 0;
//   data: any = "";
//   retrivedStocks: any = [];

//   productStocksUpdatedData :any = [];
//   paymentData:any = [];
//   orderStatusUpdate:any = [];

//   payment: FormGroup;

//   constructor(private cartService: CartService, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
//     this.payment = this.formBuilder.group({
//       accountNumber: [, [Validators.required, Validators.pattern("[0-9]{0,16}"), Validators.minLength(16), Validators.maxLength(16)]],
//       cardType: [, Validators.required],
//       expiry: [, Validators.required],
//       cvv: [, [Validators.required, Validators.pattern("[0-9]{0,16}"), Validators.minLength(3), Validators.maxLength(3)]]
//     });
//   }

//   ngOnInit() {
//     this.paymentAmount = this.cartService.getProductTotalAmount();

//     this.title.setTitle('Payment | RK MART');
//     this.data = sessionStorage.getItem("shippingData");
//     this.data = JSON.parse(this.data);
//   }

//   paymentModal(paymentDetails: any) {

//     if (this.payment.valid) {
//       this.data.cartItems.forEach((product: any) => {
//         this.http.get(`http://localhost:3000/Productdata/${product.productid}`).subscribe((data: any) => {
//           let updatedData = {
//             ...data,
//             Stock: data.Stock - product.quantity
//           }

//           let orderId = {
//             orderid: product.orderUniqueId,
//             status: 'Processing'
//           }

//           let payment = {
//             ...paymentDetails,
//             orderid: product.orderUniqueId,
//             uid: product.uid,
//             customerName: this.data.customerName,
//             customerMail: this.data.customerMail,
//             customerMobile: this.data.customerMobile,
//             status: "Payment Done"
//           }

//           this.productStocksUpdatedData.push(updatedData);
//           this.orderStatusUpdate.push(orderId);
//           this.paymentData.push(payment);
//         });
//       });

//       this.cartService.order(this.data).subscribe((response) => {
//         sessionStorage.removeItem("shippingData");
//       });

//       console.warn(this.productStocksUpdatedData);
//       console.warn(this.orderStatusUpdate);
//       console.warn(this.paymentData);

//       let paymentModal: any = document.querySelector(".paymentModal");
//       paymentModal.showModal();
//     } else {
//       let errorMessage: any = document.querySelector('#errorMessage');
//       errorMessage.innerHTML = "Enter all the Fields";

//       setTimeout(() => errorMessage.innerHTML = '', 3000);
//     }
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/user/cart.service';
import { concat, concatMap, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAmount: number = 0;
  data: any = "";
  retrivedStocks: any = [];

  ps: any = [];
  status: any = [];
  pay: any = [];

  payment: FormGroup;

  constructor(private cartService: CartService, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
    this.payment = this.formBuilder.group({
      accountNumber: [, [Validators.required, Validators.pattern("[0-9]{0,16}"), Validators.minLength(16), Validators.maxLength(16)]],
      cardType: [, Validators.required],
      expiry: [, Validators.required],
      cvv: [, [Validators.required, Validators.pattern("[0-9]{0,16}"), Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
    this.paymentAmount = this.cartService.getProductTotalAmount();

    this.title.setTitle('Payment | RK MART');
    let extractedData: any = sessionStorage.getItem("shippingData");
    this.data = JSON.parse(extractedData);
  }

  paymentModal(paymentDetails: any) {
    if (this.payment.valid) {
      this.data.cartItems.forEach((product: any) => {
        this.http.get(`http://localhost:3000/Productdata/${product.productid}`).subscribe((productData: any) => {
          productData.Stock = productData.Stock - product.quantity
          this.ps.push(productData);
          let orderId = {
            orderid: product.orderUniqueId,
            status: 'Processing'
          }
          this.status.push(orderId);
          let payment = {
            orderid: product.orderUniqueId,
            uid: product.uid,
            customerName: this.data.customerName,
            customerMail: this.data.customerMail,
            customerMobile: this.data.customerMobile,
            status: "Payment Done"
          }
          this.pay.push(payment);
        });
      });

      this.cartService.order(this.data).subscribe((response) => {
        if (response) {
          sessionStorage.removeItem("shippingData");
          let paymentModal: any = document.querySelector(".paymentModal");
          paymentModal.showModal();
        }
      });

      

      // const ud = this.http.put(`http://localhost:3000/Productdata/${product.productid}`, productData);
      // const osu = this.http.post('http://localhost:3000/orderStatusUpdate', orderId);
      // const pay = this.http.post('http://localhost:3000/payments', payment);

      // forkJoin([ud,osu,pay]).subscribe(([r1,r2,r3])=>{
      //   console.warn("okay");
      // })

      // this.http.put(`http://localhost:3000/Productdata/${product.productid}`, updatedData).pipe(
      //   concatMap(() =>{
      //     return this.http.post('http://localhost:3000/orderStatusUpdate', orderId);
      //   }),
      //   concatMap(()=>  {
      //     return this.http.post('http://localhost:3000/payments', payment)
      //   })
      // ).subscribe();

    } else {
      let errorMessage: any = document.querySelector('#errorMessage');
      errorMessage.innerHTML = "Enter all the Fields";

      setTimeout(() => errorMessage.innerHTML = '', 3000);
    }
  }
}
