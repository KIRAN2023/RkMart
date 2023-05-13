import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../adminProducts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categoryData',
  templateUrl: './categoryData.component.html',
  styleUrls: ['./categoryData.component.css']
})
export class CategoryDataComponent implements OnInit {
  categoryDisplay: any = "";
  categoryCount: any = 0;
  constructor(private adminService: AdminProductsService, private http: HttpClient) {
    this.adminService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    }); 
    this.adminService.categoryTypesCount().subscribe((category: any) => this.categoryCount = category);
  }


  ngOnInit(): void { }

  removeCategory(categoryId: any, categoryValue: any, categoryClass: any, categoryUniqueValue: any) {
    this.adminService.removeCategoryData(categoryId, categoryValue, categoryClass, categoryUniqueValue);
    this.adminService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    });
    this.adminService.categoryTypesCount().subscribe((category: any) => this.categoryCount = category);
  }
} 