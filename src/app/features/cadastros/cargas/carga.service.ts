import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carga } from './carga.model';

@Injectable({ providedIn: 'root' })
export class CargaService {
  private url = 'http://localhost:3001/cargas';

  constructor(private http: HttpClient) {}

  list(): Observable<Carga[]> {
    return this.http.get<Carga[]>(this.url);
  }
}
