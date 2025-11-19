import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

// --- IMPORTAÇÕES DO ANGULAR MATERIAL ---
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Adicionando os módulos visuais
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginData = { usuario: '', senha: '' };

  // Variável para controlar se a senha está visível ou oculta
  hidePassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    this.authService.login(this.loginData.usuario, this.loginData.senha).subscribe({
      next: () => {
        this.router.navigate(['/tarefas']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro no login! Verifique usuário e senha.');
      }
    });
  }

  fazerCadastro() {
    this.authService.register(this.loginData.usuario, this.loginData.senha).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso! Agora faça login.');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar. Tente outro nome.');
      }
    });
  }
}
