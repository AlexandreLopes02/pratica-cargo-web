import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

type LoginResponse = {
  token: string;
  user: { id: number; name: string; email: string };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.API_URL; // https://localhost:xxxx/api

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { name, password })
      .pipe(
        map((res) => {
          localStorage.setItem('pc_token', res.token);
          localStorage.setItem('pc_user', JSON.stringify(res.user));
          return true;
        })
      );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('pc_token');
  }

  getToken(): string | null {
    return localStorage.getItem('pc_token');
  }

  logout() {
    localStorage.removeItem('pc_token');
    localStorage.removeItem('pc_user');
  }

  getLoggedUser(): { id: number; name: string; email: string } | null {
    const raw = localStorage.getItem('pc_user');
    return raw ? JSON.parse(raw) : null;
  }


  updateUser(
    id: number,
    payload: Partial<{ name: string; email: string; password: string }>
  ): Observable<{ id: number; name: string; email: string }> {
    return this.http
      .put<{ id: number; name: string; email: string }>(
        `${this.baseUrl}/users/${id}`,
        payload
      )
      .pipe(
        tap((updated) => {
          // atualiza o localStorage para UI refletir na hora
          localStorage.setItem('pc_user', JSON.stringify(updated));
        })
      );
  }


}
