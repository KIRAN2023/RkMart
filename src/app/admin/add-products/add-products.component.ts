import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductsService } from '../adminProducts.service';
import { product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  head: string = "Add Product";
  addProductMessage: string | undefined;
  editOptionData: string | undefined;

  addProductForm!: FormGroup;
  allProductData: any = "";
  editProduct: product | undefined;

  editProductURLId: string | undefined | null = "";

  editProductEnable: boolean = false;
  idData: undefined | string | null;

  filterValue = ['010', '020', '030', '040', '050'];
  category:any = [];

  constructor(private productService: AdminProductsService, private formBuilder: FormBuilder, private activateUrl: ActivatedRoute, private http:HttpClient, private title:Title) {
    this.productService.categoryTypesCount().subscribe((category: any) => {
      category.forEach((category:any) => {        
        this.category.push(category.categoryTypeData);
      })
    })
  }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      Stock: [, Validators.required],
      category: [, Validators.required],
      uniqueId: [, Validators.required],
      filterValue: [, Validators.required],
      classData: [, Validators.required],
      value: [, Validators.required],
      image: [, Validators.required],
      alt: [, Validators.required],
      title: [, Validators.required],
      productName: [, Validators.required],
      quantity: [, Validators.required],
      ratingCount: [, Validators.required],
      reviewCount: [, Validators.required],
      originalAmount: [, Validators.required],
      discounted: [, Validators.required],
    });

    this.idData = this.activateUrl.snapshot.paramMap.get('id');
    if (this.idData) {
      this.head = "Update Product";
      this.editOptionData = "Update Product";
      this.productService.editProduct(this.idData).subscribe((product) => {
        if (product) {
          this.head = "Update Product";
          this.editOptionData = "Update Product";
          this.editProductEnable = true;
          this.addProductForm.controls['Stock'].setValue(product.Stock),
            this.addProductForm.controls['category'].setValue(product.category),
            this.addProductForm.controls['uniqueId'].setValue(product.uniqueId),
            this.addProductForm.controls['filterValue'].setValue(product.filterValue),
            this.addProductForm.controls['classData'].setValue(product.classData),
            this.addProductForm.controls['value'].setValue(product.value),
            this.addProductForm.controls['image'].setValue(product.image),
            this.addProductForm.controls['alt'].setValue(product.alt),
            this.addProductForm.controls['title'].setValue(product.title),
            this.addProductForm.controls['productName'].setValue(product.productName),
            this.addProductForm.controls['quantity'].setValue(product.quantity),
            this.addProductForm.controls['ratingCount'].setValue(product.ratingCount),
            this.addProductForm.controls['reviewCount'].setValue(product.reviewCount),
            this.addProductForm.controls['originalAmount'].setValue(product.originalAmount),
            this.addProductForm.controls['discounted'].setValue(product.discounted)
        }
        this.title.setTitle(`${this.addProductForm.get('title')?.value} | RK MART`);
      });

      this.addProductForm.markAsPristine()
    }
    this.activateUrl.paramMap.subscribe((data) => {
      this.editProductURLId = data.get('id');
    });
  }

  addProduct(formData: product) {
    let existProductData:any|undefined;
    this.addProductForm.invalid ? this.addProductMessage = 'Fill all the fields' : this.addProductMessage = undefined;
    this.http.get(`http://localhost:3000/Productdata?productName=${formData.productName}`).subscribe((response:any)=>{
       existProductData = response[0]?.productName;    
       if (this.addProductForm.valid && existProductData != formData.productName) {        
        this.productService.addProduct(formData).subscribe((response) => {
          if (response) {
            this.addProductMessage = "Product Added Successfully";
          }
          setTimeout(() => this.addProductMessage = undefined, 3000);
        });
      }else{
        alert(`Product ${formData.productName} Already Exist`);
      }     
    })
  }

  updateProduct(productData: product) {
    this.addProductForm.invalid ? this.addProductMessage = 'Fill all the fields' : this.addProductMessage = undefined;
    if (this.addProductForm.valid && !this.addProductForm.pristine) {
      this.productService.updateProductData(productData, this.editProductURLId).subscribe((response) => {
        if (response) {
          this.addProductMessage = "Product Updated Successfully";
        }
        setTimeout(() => this.addProductMessage = undefined, 3000);
      });
    }else{
      alert("No Data has been Modified");
    }
  }

  resetForm() {
    this.addProductForm.reset();
  }
}