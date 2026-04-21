import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Carga } from './carga.model';

@Injectable({ providedIn: 'root' })
export class CargaService {
  private url = `${this.api.baseUrl}/cargas`;

  constructor(private http: HttpClient, private api: ApiService) {}

  list(): Observable<Carga[]> {
    return this.http.get<Carga[]>(this.url);
  }
}
