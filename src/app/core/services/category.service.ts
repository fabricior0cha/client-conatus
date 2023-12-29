import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BasicResourceService } from './basic-resource.service';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BasicResourceService<Category> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/conatus-core/categorias');
  }

  public searchByDescription(
    description: string
  ): Observable<Pageable<Category>> {
    return this.httpClient.get<Pageable<Category>>(
      environment.apiUrl +
        this.serviceUrl +
        '/descricoes?descricao=' +
        description
    );
  }
}
