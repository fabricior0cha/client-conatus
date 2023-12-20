import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Domain } from '../models/domain.model';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private httpClient: HttpClient) {}

  public getDomainByCode(code: string): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(
      environment.apiUrl + `/conatus-adm/dominios/tipos-codigos/${code}`
    );
  }
}
