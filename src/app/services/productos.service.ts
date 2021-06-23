import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable()
export class ProductosService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymesbackend.azurewebsites.net/api/productos/';
  }

  get(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.resourceUrl);
  }

  post(producto: Producto) {
    return this.httpClient.post(this.resourceUrl, producto);
  }
}
