import * as CryptoJS from 'crypto-js';

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminProductsService } from 'src/app/admin/adminProducts.service';
import { AuthUserGuard } from 'src/app/auth-user.guard';
import { CartService } from 'src/app/user/cart.service';
import { ProductsDataService } from 'src/app/user/productsData.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  admins: any = "";
  adminLoggedin: boolean = false;
  users: any = "";
  loggedin: boolean = false;
  loggedinUser: any = "";
  loggedinUserMail: string = "";

  cartDataCount: number = 0;

  @Output() loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dataService: ProductsDataService, private cartService: CartService, private loginFormBuilder: FormBuilder, private admin: AdminProductsService, private auth: AuthUserGuard, private router: Router, private http: HttpClient) {
    this.dataService.registeredUser().subscribe((user) => {
      this.users = user;
    });
    this.dataService.admin().subscribe((user) => {
      this.admins = user;
    });
    this.loggedin = this.dataService.userLogin;
    this.loggedinUser = this.dataService.activeUser;
    this.adminLoggedin = this.admin.admin;
  }

  ngOnInit() {
    if (sessionStorage.getItem('userLoggedIn')) {
      this.loggedin = true;
      this.dataService.userLogin = this.loggedin;
      this.loggedinUser = sessionStorage.getItem('userName');
      this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
      this.cartService.getProducts().subscribe(product => this.cartDataCount = product.length);
    }
  }

  registerForm = this.loginFormBuilder.group(
    {
      username: [, [Validators['required'], Validators['pattern']]],
      mail: [, [Validators['required'], Validators['pattern']]],
      mobile: [, [Validators['required'], Validators['pattern']]],
      password: ['', [Validators['required'], Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$")]]
    }
  )

  loginModal() {
    this.dataService.registeredUser().subscribe((user) => {
      this.users = user;
    });
    const LoginPanel: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');

    RegisterPanel.close();
    SuccessfulRegistered.close();
    LoginPanel.showModal();
  }

  closePanel() {
    const loginDiv: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    loginDiv.close();
    RegisterPanel.close();
  }

  registerModal() {
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const LoginPanel: any = document.querySelector(".Loginmodal");
    LoginPanel.close();
    RegisterPanel.showModal();
  }

  registerUser() {
    let invalidRegistration: any = document.querySelector('#registerError');

    if (this.registerForm.valid) {
      let newUser: boolean = true;

      let SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');
      const RegisterPanel: any = document.querySelector(".Registermodal");
      RegisterPanel.close();

      this.http.get<any>("http://localhost:3000/registeredUser").subscribe((user) => {
        user.find((userData: any) => {
          if (userData.mail == this.registerForm.get('mail')?.value || userData.mobile == this.registerForm.get('mobile')?.value) {
            newUser = false;
          }
        });
        if (newUser) {
          let userPassword: any = this.registerForm.controls["password"].value;
          let encryptedPassword = CryptoJS.AES.encrypt(userPassword, userPassword).toString();
          this.registerForm.get("password")?.setValue(encryptedPassword);
          this.dataService.registerUser(this.registerForm.value).subscribe(data => { });
          SuccessfulRegistered.showModal();
        } else {
          alert("Already Registered");
          RegisterPanel.showModal();
        }
      });
    }else{
      invalidRegistration.innerHTML = "Enter all the fields";
      setTimeout(() => invalidRegistration.innerHTML = '', 3000 )
    }
  }

  login(usermail: any, userpassword: any) {
    var invalidLogin: any = document.querySelector('#loginError');
    this.loggedin = false;

    if (usermail.value.trim() !== '' || userpassword.value.trim() !== '') {
      for (let user of this.users) {
        let decryptedValue = CryptoJS.AES.decrypt(user.password, userpassword.value).toString(CryptoJS.enc.Utf8);
        if (usermail.value === user.mail && userpassword.value === decryptedValue) {
          invalidLogin.innerHTML = "";
          this.loggedinUser = user;
          this.dataService.activeUser = this.loggedinUser;
          this.loggedin = true;
          this.dataService.userLogin = this.loggedin;
          sessionStorage.setItem('userLoggedIn', 'true')
          sessionStorage.setItem('userName', user.username);
          sessionStorage.setItem('userMail', user.mail);
          sessionStorage.setItem('userId', user.id);
          this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
          this.cartService.getProducts().subscribe(product => this.cartDataCount = product.length);
          this.closePanel();
          alert("Login Successful");
          this.loginStatus.emit(this.loggedin);
          break;
        }
      }


      if (!this.loggedin) {
        for (let user of this.admins) {
          let decryptedValue = CryptoJS.AES.decrypt(user.password, userpassword.value).toString(CryptoJS.enc.Utf8);

          if (usermail.value === user.mail && userpassword.value === decryptedValue) {
            this.loggedin = true;
            this.admin.admin = true;
            sessionStorage.setItem('adminLoggedIn', 'true')
            sessionStorage.setItem('userName', user.name);
            this.closePanel();
            this.router.navigate(['admin/dashboard']);
            break;
          }
        }
      }

      if (!this.loggedin) {
        var invalidLogin: any = document.querySelector('#loginError');
        invalidLogin.innerHTML = "Invalid Credentials";
      }
    } else {
      invalidLogin.innerHTML = "Enter all the fields";
      setTimeout(() => invalidLogin = undefined, 3000 )
    }
  }
  logout() {
    let result = confirm("Are you sure want to Logout");
    if (result) {
      this.loggedin = false;
      this.dataService.userLogin = this.loggedin;
      this.loggedinUser = "";
      this.dataService.activeUser = this.loggedinUser;
      sessionStorage.clear();
      this.loginStatus.emit(this.loggedin);
    }
  }
}

