import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './empresa.model';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url = `${this.api.baseUrl}/empresas`;

  constructor(private http: HttpClient, private api: ApiService) { }

  list(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }


  getById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  create(data: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.url, data);
  }

  update(id: number, data: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findByCnpj(cnpj: string) {
  return this.http.get<Empresa>(`${this.url}/by-cnpj/${encodeURIComponent(cnpj)}`);
 }

}
