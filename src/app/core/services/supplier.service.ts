import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private httpClient: HttpClient) {}

  getSuppliers(
    page: number | undefined,
    size: number | undefined
  ): Observable<Pageable<Supplier>> {
    page = page || 0;
    size = size || 5;
    return this.httpClient.get<Pageable<Supplier>>(
      environment.apiUrl + '/conatus-core/fornecedores',
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

  createSupplier(supplier: Supplier): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + '/conatus-core/fornecedores',
      supplier,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }

  updateSupplier(supplier: Supplier): Observable<any> {
    return this.httpClient.put<any>(
      environment.apiUrl + '/conatus-core/fornecedores/' + supplier.id,
      supplier,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }
}