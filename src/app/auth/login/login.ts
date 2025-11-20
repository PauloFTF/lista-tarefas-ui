import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

// --- IMPORTAÇÕES VISUAIS ---
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // <--- NOVO: Para mensagens

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule // <--- Não esqueça de adicionar aqui
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginData = { usuario: '', senha: '' };
  hidePassword = true;

  // Controla se estamos vendo a tela de LOGIN ou de CADASTRO
  isRegistering = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Injetando o serviço de mensagens
  ) {}

  // Alterna entre Login e Cadastro
  toggleMode() {
    this.isRegistering = !this.isRegistering;
    // Limpa os campos para evitar confusão
    this.loginData = { usuario: '', senha: '' };
  }

  fazerLogin() {
    this.authService.login(this.loginData.usuario, this.loginData.senha).subscribe({
      next: () => {
        this.mostrarMensagem('Login realizado com sucesso! 🚀');
        this.router.navigate(['/tarefas']);
      },
      error: (err) => {
        this.mostrarMensagem('Erro no login! Verifique usuário e senha.', true);
      }
    });
  }

  fazerCadastro() {
    this.authService.register(this.loginData.usuario, this.loginData.senha).subscribe({
      next: () => {
        this.mostrarMensagem('Usuário cadastrado com sucesso! Faça login.');
        this.toggleMode(); // Volta para a tela de login automaticamente
      },
      error: (err) => {
        this.mostrarMensagem('Erro ao cadastrar. Este usuário já existe?', true);
      }
    });
  }

  // Função auxiliar para mostrar mensagens bonitas
  private mostrarMensagem(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'] // Classes CSS que vamos criar
    });
  }
}
