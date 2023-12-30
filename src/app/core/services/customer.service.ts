import { Injectable } from '@angular/core';
import { BasicResourceService } from './basic-resource.service';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BasicResourceService<Customer> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/conatus-core/clientes');
  }
}
