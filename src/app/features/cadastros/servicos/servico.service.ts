import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico, ServicoExpandido } from './servico.model';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private url = `${this.api.baseUrl}/servicos`;

  constructor(private http: HttpClient, private api: ApiService) { }

  list(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.url);
  }

  getById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.url}/${id}`);
  }

  create(data: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.url, data);
  }

  update(id: number, data: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listExpandido() {
    return this.http.get<ServicoExpandido[]>(this.url);
  }

  listPorEmpresa(empresaId: number) {
    return this.http.get<ServicoExpandido[]>(`${this.url}/by-empresa/${empresaId}`);
  }

  listPorMotorista(motoristaId: number) {
    return this.http.get<ServicoExpandido[]>(`${this.url}/by-motorista/${motoristaId}`);
  }

}
