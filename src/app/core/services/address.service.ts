import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  public getByCep(cep: string): Observable<Address> {
    return this.httpClient.get<Address>(
      environment.apiUrl + '/conatus-core/enderecos/' + cep
    );
  }
}
