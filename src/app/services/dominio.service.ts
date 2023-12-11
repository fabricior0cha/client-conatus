import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dominio } from '../model/dominio';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DominioService {
  constructor(private httpClient: HttpClient) {}

  public getDomainByCode(code: string): Observable<Dominio[]> {
    return this.httpClient.get<Dominio[]>(
      environment.apiUrl + `/dominios/tipos-codigos/${code}`
    );
  }
}
