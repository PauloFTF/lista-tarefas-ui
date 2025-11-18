import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // IMPORTANTE: Certifique-se de que esta URL corresponde à do seu Java
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  // Faz o login e salva o token no navegador
  login(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { login: usuario, senha }).pipe(
      tap(resposta => {
        if (resposta.token) {
          // Salva o token no "disco rígido" do navegador
          localStorage.setItem('meu-token', resposta.token);
        }
      })
    );
  }

  // Cria um novo usuário
  register(usuario: string, senha: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { login: usuario, senha, role: 'USER' });
  }

  // Pega o token salvo
  getToken(): string | null {
    return localStorage.getItem('meu-token');
  }

  // Logout (apaga o token)
  logout(): void {
    localStorage.removeItem('meu-token');
  }

  // Verifica se o usuário está logado (tem token)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
