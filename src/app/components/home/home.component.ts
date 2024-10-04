import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from '../product/product.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { Product, Products, ProductsDto } from '../../../types';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: '',
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!product.id) {
      return;
    }

    this.editProduct(product, product.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts({ page, perPage }).subscribe({
      next: (data: Products) => {
        console.log(data);
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  editProduct(product: Product, id: string) {
    this.productsService.editProduct(id, product).subscribe({
      next: (data: Product) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  deleteProduct(id: string) {
    console.log(id);

    this.productsService.deleteProduct(id).subscribe({
      next: (data: Product) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },

      error: (error: string) => {
        console.log(error);
      },
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: (data: Product) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
