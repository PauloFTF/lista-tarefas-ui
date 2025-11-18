import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para o formulário funcionar
import { Router } from '@angular/router'; // Para mudar de página
import { AuthService } from '../auth'; // Importando do seu arquivo auth.ts

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // Ajustado para os nomes da sua imagem:
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // Dados do formulário
  loginData = {
    usuario: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Ação de Login
  fazerLogin() {
    this.authService.login(this.loginData.usuario, this.loginData.senha).subscribe({
      next: () => {
        // Se der certo, vai para as tarefas
        this.router.navigate(['/tarefas']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro no login! Verifique usuário e senha.');
      }
    });
  }

  // Ação de Cadastro
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
