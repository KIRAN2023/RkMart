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
    this.http.get(`http://localhost:3000/category/${categoryId}`).subscribe((categoryData: any) => {
      let categoryDataObject = categoryData;
      let categoryKey = "category";
      let categoryClassKey = "categoryClass";
      let categoryUniqueValueKey = "categoryUniqueValue"

      if (categoryDataObject[categoryKey].indexOf(categoryValue) != -1 && categoryDataObject[categoryClassKey].indexOf(categoryClass) != -1 && categoryDataObject[categoryUniqueValueKey].indexOf(categoryUniqueValue) != -1) {
        categoryDataObject[categoryKey].splice(categoryDataObject[categoryKey].indexOf(categoryValue), 1);
        categoryDataObject[categoryClassKey].splice(categoryDataObject[categoryClassKey].indexOf(categoryValue), 1);
        categoryDataObject[categoryUniqueValueKey].splice(categoryDataObject[categoryUniqueValueKey].indexOf(categoryValue), 1);
      }

      this.adminService.removeCategory(categoryId, categoryDataObject).subscribe((response) => {
        if (response) {
          alert("Category Remove Successfully");
        } else {
          alert("Error While Removing Category");
        }
      })
    });
  }
} 