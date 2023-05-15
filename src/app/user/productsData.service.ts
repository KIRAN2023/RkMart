import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../admin/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  rkMartProducts: any = "";

  adminLogin: boolean = false;

  userLogin: boolean = false;
  activeUser: any = "";
  userId:number|undefined;
  activeUserMail:string="";

  getAdminUrl = 'http://localhost:3000/admin';
  getProductDataUrl = 'http://localhost:3000/Productdata';
  getCategoryUrl = 'http://localhost:3000/category';
  getCategoryUrlTypes = 'http://localhost:3000/categoryTypes';
  getRegisteredUsersUrl = 'http://localhost:3000/registeredUser';

  constructor(private http: HttpClient) { }

  admin() {
    return this.http.get(`${this.getAdminUrl}`);
  }

  getProducts() {
    return this.http.get<product>(`${this.getProductDataUrl}`);
  }

  getCategory(){
    return this.http.get(`${this.getCategoryUrl}`);
  }

  getCategoryTypes(){
    return this.http.get(`${this.getCategoryUrlTypes}`);
  }

  registerUser(userData: any) {
    return this.http.post(`${this.getRegisteredUsersUrl}`, userData);
  }

  registeredUser() {
    return this.http.get(`${this.getRegisteredUsersUrl}`);
  }
}


