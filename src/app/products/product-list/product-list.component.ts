import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {
  getCurrentProduct,
  getShowProductCode,
  State,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;
  products: Product[];
  selectedProduct: Product | null;
  displayCode: boolean;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(getCurrentProduct)
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.store.select(getShowProductCode).subscribe((showProductCode) => {
      this.displayCode = showProductCode;
    });
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(selectedProduct: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ product: selectedProduct })
    );
  }
}
