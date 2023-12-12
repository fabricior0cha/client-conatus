import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../model/tenant';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(public httpClient: HttpClient) {}

  public signup(tenant: Tenant): Observable<any> {
    return this.httpClient.post<Tenant>(
      environment.apiUrl + `/conatus-adm/tenants`,
      tenant
    );
  }
}
