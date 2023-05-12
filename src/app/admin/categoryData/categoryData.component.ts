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
    let confirmation = confirm("Are you sure want to delete");
    if (confirmation) {
      this.http.get(`http://localhost:3000/category/${categoryId}`).subscribe((categoryData: any) => {
        let categoryDataObject = categoryData;

        if (categoryDataObject["category"].indexOf(categoryValue) != -1 && categoryDataObject["categoryClass"].indexOf(categoryClass) != -1 && categoryDataObject["categoryUniqueValue"].indexOf(categoryUniqueValue) != -1) {
          categoryDataObject["category"].splice(categoryDataObject["category"].indexOf(categoryValue), 1);
          categoryDataObject["categoryClass"].splice(categoryDataObject["categoryClass"].indexOf(categoryValue), 1);
          categoryDataObject["categoryUniqueValue"].splice(categoryDataObject["categoryUniqueValue"].indexOf(categoryValue), 1);
        }

        if (categoryData.category.length !== 0) {
          this.adminService.removeCategory(categoryId, categoryDataObject).subscribe((response) => {
            response ? alert("Category Remove Successfully") : alert("Error While Removing Category");
          })
        }
        if (categoryData.category.length == 0) {
          this.adminService.removeCategoryTypes(categoryId).subscribe();

          this.http.delete(`http://localhost:3000/category/${categoryId}`).subscribe();
        }
        this.adminService.getCategory().subscribe((data) => {
          this.categoryDisplay = data;
        });
        this.adminService.categoryTypesCount().subscribe((category: any) => this.categoryCount = category);
      });
    }
  }
} 