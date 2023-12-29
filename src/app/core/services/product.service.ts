import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicResourceService } from './basic-resource.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BasicResourceService<Product> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/conatus-core/produtos');
  }
}
