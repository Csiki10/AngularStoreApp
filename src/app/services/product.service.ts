import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}
  private url = 'http://localhost:8000/clothes';

  getProducts = (params: PaginationParams): Observable<Products> => {
    return this.apiService.get(this.url, {
      params: params,
      responseType: 'json',
    });
  };

  addProduct = (body: Product): Observable<Product> => {
    return this.apiService.post(this.url, body, {
      responseType: 'json',
    });
  };

  editProduct = (id: string, body: Product): Observable<Product> => {
    return this.apiService.put(this.url + '/' + id, body, {
      responseType: 'json',
    });
  };

  deleteProduct = (id: string): Observable<Product> => {
    return this.apiService.delete(this.url + '/' + id, {
      responseType: 'json',
    });
  };
}
