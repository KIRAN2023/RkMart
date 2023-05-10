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
  categoryDisplay: any = "";

  constructor(private route: ActivatedRoute, private productService: ProductsDataService) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('category')) {
      this.category = this.route.snapshot.paramMap.get('category');
    }

    this.productService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    });

    this.productService.getCategory().subscribe((data)=>{
      this.categoryDisplay = data;        
  });
  }
}
