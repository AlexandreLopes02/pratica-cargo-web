import { Injectable } from '@angular/core';
import { Motorista } from './motorista.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private url = `${this.api.baseUrl}/motoristas`;

  constructor(private http: HttpClient, private api: ApiService) { }

  list(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.url);
  }

  getById(id: number): Observable<Motorista> {
    return this.http.get<Motorista>(`${this.url}/${id}`);
  }

  create(data: Motorista): Observable<Motorista> {
    return this.http.post<Motorista>(this.url, data);
  }

  update(id: number, data: Motorista): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findByCpf(cpf: string) {
  return this.http.get<Motorista>(`${this.url}/by-cpf/${encodeURIComponent(cpf)}`);
}
  
}
