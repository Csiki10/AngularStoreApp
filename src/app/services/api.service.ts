import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpclient: HttpClient) {}

  get<T>(url: string, options?: Options): Observable<T> {
    return this.httpclient.get<T>(url, options) as Observable<T>;
  }
}
