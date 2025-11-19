import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router'; // 1. Importe o Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/auth';

  // 2. Injete o Router no construtor
  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { login: usuario, senha }).pipe(
      tap(resposta => {
        if (resposta.token) {
          localStorage.setItem('meu-token', resposta.token);
        }
      })
    );
  }

  register(usuario: string, senha: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { login: usuario, senha, role: 'USER' });
  }

  getToken(): string | null {
    return localStorage.getItem('meu-token');
  }

  // 3. Atualize o método logout
  logout(): void {
    localStorage.removeItem('meu-token'); // Apaga o crachá
    this.router.navigate(['/login']);     // Manda o usuário para a porta de entrada
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
