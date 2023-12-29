import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { environment } from 'src/environments/environment';
import { BasicResourceService } from './basic-resource.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends BasicResourceService<Supplier> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/conatus-core/fornecedores');
  }

  public searchByName(name: string): Observable<Pageable<Supplier>> {
    return this.httpClient.get<Pageable<Supplier>>(
      environment.apiUrl + this.serviceUrl + '/nomes?nome=' + name
    );
  }
}
