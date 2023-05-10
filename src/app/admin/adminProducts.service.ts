import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsDataService } from 'src/productsData.service';
import { product } from './product';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  categoryCount: number = 0;

  adminName: any = "";

  admin: boolean = false;
  editProductData: any = "";
  editProductID: any;

  getProductDataUrl = 'http://localhost:3000/Productdata';
  getCategoryUrl = 'http://localhost:3000/category';

  getCategoryTypesUrl = 'http://localhost:3000/categoryTypes';
  getRegisteredUsersUrl = 'http://localhost:3000/registeredUser';

  constructor(private http: HttpClient, private userAuth: ProductsDataService, private route: Router) {
    this.adminName = sessionStorage.getItem("adminLoggedin");
  }

  getProducts() {
    return this.http.get(`${this.getProductDataUrl}`);
  }

  productTotalAmount() {
    let productTotalAmount: any = 0
    return this.http.get(`${this.getProductDataUrl}`).pipe(
      map((product: any) => {
        product.forEach((product: any) => {
          productTotalAmount += parseInt(product.originalAmount);
        });
        return productTotalAmount.toLocaleString('en');
      })
    )
  }

  getUsers() {
    return this.http.get(`${this.getRegisteredUsersUrl}`);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.getProductDataUrl}/${id}`);
  }

  addProduct(productData: product) {
    return this.http.post(`${this.getProductDataUrl}`, productData);
  }

  categoryTypes(categoryData: any) {
    return this.http.post(`${this.getCategoryTypesUrl}`, categoryData);
  }

  categoryTypesCount() {
    return this.http.get(`${this.getCategoryTypesUrl}`);
  }

  addCategory(categoryData: any) {
    return this.http.post(`${this.getCategoryUrl}`, categoryData);
  }

  updateCategory(categoryData: any, key: any, id: any) {
    return this.http.patch(`${this.getCategoryUrl}/${id}`, { [key]: categoryData });
  }

  getCategory() {
    return this.http.get(`${this.getCategoryUrl}`);
  }

  addCategoryTypes(category: string) {
    return this.http.post(`${this.getCategoryTypesUrl}`, category);
  }

  removeCategory(categoryId:any, updatedData:any){
    return this.http.put(`${this.getCategoryUrl}/${categoryId}`,updatedData);
  }

  editProduct(productId: string | undefined | null) {
    return this.http.get<product>(`${this.getProductDataUrl}/${productId}`);
  }

  updateProductData(product: product, productID: string | undefined | null) {
    return this.http.put<product>(`${this.getProductDataUrl}/${productID}`, product);
  }

  removerUser(user: any) {
    return this.http.delete(`${this.getRegisteredUsersUrl}/${user}`);
  }

  logout() {
    this.admin = false;
    this.userAuth.adminLogin = false;
    sessionStorage.clear();
    this.route.navigate(['/', 'home']);
  }

  addCategoryTest(categoryID: any, categoryKey1: any, categoryKey2: any, categoryKey3: any, categoryData1: any, categoryData2: any, categoryData3: any) {

    return this.http.get(`${this.getCategoryUrl}/${categoryID}`).pipe(
      switchMap((result: any) => {

        let updatedCategory1 = result[categoryKey1].concat(categoryData1);
        let updatedCategory2 = result[categoryKey2].concat(categoryData2);
        let updatedCategory3 = result[categoryKey3].concat(categoryData3);

        const updatedValue = { [categoryKey1]: updatedCategory1, [categoryKey2]: updatedCategory2, [categoryKey3]: updatedCategory3 };

        return this.http.patch(`${this.getCategoryUrl}/${categoryID}`, updatedValue);
      })
    )
  }
}
