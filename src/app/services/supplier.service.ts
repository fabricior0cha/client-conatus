import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pageable } from '../model/pageable';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private httpClient: HttpClient) {}

  getSuppliers(): Observable<Pageable<Supplier>> {
    return this.httpClient.get<Pageable<Supplier>>(
      environment.apiUrl + '/conatus-core/fornecedores',
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }
}
