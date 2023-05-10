import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AddCategoryComponent } from './addCategory/addCategory.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDataComponent } from './categoryData/categoryData.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent,
    AddProductsComponent,
    CategoryDataComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AddProductsComponent,
    CategoryDataComponent
  ]
})
export class AdminModule { }
