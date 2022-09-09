import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  idProduct: string | null =null;
  productDetail: Product | null=null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params)=>{
        this.idProduct=params.get('id');
        if (this.idProduct) {
          return this.productsService.getOne(this.idProduct);
        }
        return [null];
      })
    ).subscribe(data=>{
      this.productDetail=data;
    });
  }

  goToBack(){
    this.location.back();
  }
}
