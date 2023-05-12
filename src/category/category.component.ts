import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: string | null = "";
  currentCategory:string|null|undefined;

  categoryTypes:any=[];
  categoryDisplay: any = "";

  constructor(private route: ActivatedRoute, private productService: ProductsDataService) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('category')) {
      this.category = this.route.snapshot.paramMap.get('category');
      this.currentCategory = this.route.snapshot.paramMap.get('category');
    }

    this.productService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    });

    this.productService.getCategoryTypes().subscribe((categoryType:any)=>{
      categoryType.forEach((data:any)=>{
        this.categoryTypes.push(data.categoryTypeData);
      })
    })    
  }
}
