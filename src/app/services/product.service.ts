import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map to transform the data
import {
  PaginationParams,
  Product,
  ProductDto,
  Products,
  ProductsDto,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}
  private prod_url = 'https://angular-cc-1-server-master.vercel.app/clothes';

  // test
  private dtoToProduct(dto: ProductDto): Product {
    return {
      id: dto._id,
      price: dto.price,
      name: dto.name,
      image: dto.image,
      rating: dto.rating,
    };
  }

  private productToDto(product: Product): ProductDto {
    return {
      _id: product.id,
      price: product.price,
      name: product.name,
      image: product.image,
      rating: product.rating,
    };
  }

  private dtoToProducts(productsDto: ProductsDto): Products {
    return {
      items: productsDto.items.map(this.dtoToProduct),
      total: productsDto.total,
      page: productsDto.page,
      perPage: productsDto.perPage,
      totalPages: productsDto.totalPages,
    };
  }

  getProducts = (params: PaginationParams): Observable<Products> => {
    return this.apiService
      .get<ProductsDto>(this.prod_url, {
        params: params,
        responseType: 'json',
      })
      .pipe(map((data: ProductsDto) => this.dtoToProducts(data)));
  };

  addProduct = (body: Product): Observable<ProductDto> => {
    return this.apiService
      .post<ProductDto>(this.prod_url, this.productToDto(body), {
        responseType: 'json',
      })
      .pipe(map((data: ProductDto) => this.dtoToProduct(data)));
  };

  editProduct = (id: string, body: Product): Observable<ProductDto> => {
    return this.apiService
      .put<ProductDto>(this.prod_url + '/' + id, this.productToDto(body), {
        responseType: 'json',
      })
      .pipe(map((data: ProductDto) => this.dtoToProduct(data)));
  };

  deleteProduct = (id: string): Observable<ProductDto> => {
    return this.apiService
      .delete<ProductDto>(this.prod_url + '/' + id, {
        responseType: 'json',
      })
      .pipe(map((data: ProductDto) => this.dtoToProduct(data)));
  };
}
