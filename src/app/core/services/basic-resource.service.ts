import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../models/pageable.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BasicModelResource } from '../models/basic-resource.model';

export class BasicResourceService<T extends BasicModelResource<T>> {
  constructor(protected httpClient: HttpClient, protected serviceUrl: string) {}

  public get({
    page = 0,
    size = 5,
  }: {
    page?: number;
    size?: number;
  }): Observable<Pageable<T>> {
    return this.httpClient.get<Pageable<T>>(
      environment.apiUrl + this.serviceUrl,
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

  public getById(id: number): Observable<T> {
    return this.httpClient.get<T>(
      environment.apiUrl + this.serviceUrl + '/' + id,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }

  public create(resource: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + this.serviceUrl,
      resource,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }

  public update(resource: any): Observable<any> {
    return this.httpClient.put<any>(
      environment.apiUrl + this.serviceUrl + '/' + resource.id,
      resource,
      {
        headers: new HttpHeaders().set(
          'tenant',
          'a7efdd20-e12b-48fe-81fe-0b109db5da95'
        ),
      }
    );
  }
}
