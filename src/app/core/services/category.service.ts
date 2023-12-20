import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable.model';
import { Category } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public httpClient: HttpClient) {}

  getCategories(
    page: number | undefined,
    size: number | undefined
  ): Observable<Pageable<Category>> {
    page = page || 0;
    size = size || 5;
    return this.httpClient.get<Pageable<Category>>(
      environment.apiUrl + '/conatus-core/categorias',
      {
        params: {
          page: page.toString(),
          size: size.toString(),
        },
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }

  createCategory(category: Category): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + '/conatus-core/categorias',
      category,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient.put<any>(
      environment.apiUrl + '/conatus-core/categorias/' + category.id,
      category,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }
}
