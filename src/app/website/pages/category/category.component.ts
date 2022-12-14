import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/models/product.model';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null= null;
  limit = 10;
  offset = 0;
  products: Product[]=[];
  productId: string | null= null;
  
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId= params.get('id')
      if (this.categoryId) {
        this.productsService.getByCategory(this.categoryId, this.limit,this.offset)
        .subscribe(data=>{
          console.log(data)
          this.products=data;
        });
      }
    });
    this.route.queryParamMap.subscribe(params=>{
      this.productId= params.get('product');
    });
  }

  loadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
