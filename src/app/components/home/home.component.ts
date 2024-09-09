import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Products } from '../../../types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productService
      .getProducts('http://localhost:3000/clothes', {
        page: 0,
        perPage: 5,
      })
      .subscribe((products: Products) => (this.products = products.items));
  }
}
