import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Products } from '../../../types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  apiUrl: string = 'http://localhost:3000/clothes';

  ngOnInit(): void {
    this.fectProducts(0, this.rows);
  }

  onPageChange(event: any) {
    this.fectProducts(event.page, event.rows);
  }

  fectProducts(page: number, perPage: number) {
    this.productService
      .getProducts(this.apiUrl, {
        page: page,
        perPage: perPage,
      })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService.editProduct(this.apiUrl + '/' + id, product).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.fectProducts(0, this.rows);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(this.apiUrl, product).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.fectProducts(0, this.rows);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(this.apiUrl + '/' + id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.fectProducts(0, this.rows);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }
}
