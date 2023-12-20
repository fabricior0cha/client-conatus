import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tenant } from '../models/tenant.model';

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
