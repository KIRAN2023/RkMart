import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductsService } from '../adminProducts.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-addCategory',
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryStatusMessage: string | undefined;

  categoryId: any | undefined;
  categoryType: any | undefined;
  categoryValueData: any | undefined;
  categoryClass: any | undefined;
  categoryUniqueId: any | undefined;

  categoryData!: FormGroup;
  existingCategoryData: any | undefined;

  queryParamData: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminProductsService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.queryParamData = false;

    this.categoryData = this.formBuilder.group({
      categoryType: [, Validators.required],
      category: [, Validators.required],
      categoryClass: [, Validators.required],
      categoryUniqueValue: [, Validators.required],
    });

    if (this.route.snapshot.queryParamMap.has('categoryType')) {
      this.queryParamData = true;
      this.route.queryParams.subscribe((params) => {
        this.categoryId = this.route.snapshot.paramMap.get('id');
        this.categoryData.controls['categoryType'].setValue(params['categoryType']),
          this.categoryData.controls['category'].setValue(params['category']),
          this.categoryData.controls['categoryClass'].setValue(params['categoryClass']),
          this.categoryData.controls['categoryUniqueValue'].setValue(params['categoryUnique'])
      });
      this.categoryType = this.categoryData.controls['categoryType'].value;
      this.categoryValueData = this.categoryData.controls['category'].value;
      this.categoryClass = this.categoryData.controls['categoryClass'].value;
      this.categoryUniqueId = this.categoryData.controls['categoryUniqueValue'].value;
    }
  }

  ngOnInit() { }

  addProduct(formData: any) {
    let categoryExist: boolean = false;
    let existingCategoryId: string | number | undefined;

    this.categoryData.invalid ? this.categoryStatusMessage = 'Fill all the fields' : this.categoryStatusMessage = undefined;

    if (this.categoryData.valid) {
      this.adminService.getCategory().subscribe((category: any) => {
        category.forEach((categoryDatas: any) => {
          if (categoryDatas.categoryType == formData.categoryType) {
            categoryExist = true;
            existingCategoryId = categoryDatas.id;
          }
        });
        let categoryValues = {
          categoryType: formData.categoryType,
          category: formData.category.split(','),
          categoryClass: formData.categoryClass.split(','),
          categoryUniqueValue: formData.categoryUniqueValue.split(',')
        }
        this.dataUpdating(categoryExist, categoryValues, existingCategoryId);
      });
    }
  }

  updateProduct(updatedData: any) {
    this.http.get(`http://localhost:3000/category/${this.categoryId}`).subscribe((categoryData: any) => {
      console.warn(categoryData.category);

      let dataToUpdate = {
        ...categoryData,
        categoryType: categoryData.categoryType.replace(`${this.categoryType}`, updatedData.categoryType),
        category: categoryData.category.map((data:any) => data.replace(`${this.categoryValueData}`, updatedData.category)),
        categoryClass: categoryData.categoryClass.map((data: any) => data.replace(`${this.categoryClass}`, updatedData.categoryClass)),
        categoryUniqueValue: categoryData.categoryUniqueValue.map((data: any) => data.replace(`${this.categoryUniqueId}`, updatedData.categoryUniqueValue)), 
      }
      console.warn(dataToUpdate);

      // this.adminService.updateCategoryData(this.categoryId, dataToUpdate).subscribe((response) => {
      //   alert("Updated Successfully")
      // })
    })
  }

  dataUpdating(categoryExist: boolean, categoryData: any, existingCategoryId: number | string | undefined) {
    if (categoryExist == false) {
      var categoryTypeDataValue: any = { categoryTypeData: categoryData.categoryType }

      this.adminService.addCategory(categoryData).subscribe((response) => {
        if (response) {
          this.adminService.addCategoryTypes(categoryTypeDataValue).subscribe();
          this.categoryStatusMessage = "Category Added Successfully";
        }
        setTimeout(() => this.categoryStatusMessage = undefined, 3000);
      });
    }
    if (categoryExist) {
      let categoryDataExist: boolean = false;
      this.http.get(`http://localhost:3000/category/${existingCategoryId}`).subscribe((data: any) => {

        data.category.forEach((datas: any) => {
          if (datas == categoryData.category) {
            categoryDataExist = true;
          }
        })

        if (categoryDataExist == false) {
          this.adminService.addCategoryTest(existingCategoryId, "category", "categoryClass", "categoryUniqueValue", categoryData.category, categoryData.categoryClass, categoryData.categoryUniqueValue).subscribe((response) => {
            if (response) {
              console.warn(response);
            }
            setTimeout(() => this.categoryStatusMessage = undefined, 3000);
          });
        }
      });
    }
  }
}
