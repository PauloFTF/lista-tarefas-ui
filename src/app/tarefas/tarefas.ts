import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaService } from '../tarefa';
import { AuthService } from '../auth/auth'; // 1. Importe o AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefas.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];
  novaTarefaDescricao: string = "";

  // 2. Injete o AuthService no construtor
  constructor(
    private tarefaService: TarefaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  // ... (mantenha seus métodos carregarTarefas, adicionarTarefa, etc. iguais) ...
  carregarTarefas(): void {
      this.tarefaService.getTarefas().subscribe(tarefasRecebidas => {
        this.tarefas = tarefasRecebidas;
      });
  }

  // ... (outros métodos) ...

  adicionarTarefa(): void {
    if (this.novaTarefaDescricao.trim() === '') return;
    const novaTarefa: Tarefa = {
      descricao: this.novaTarefaDescricao,
      concluida: false
    };
    this.tarefaService.addTarefa(novaTarefa).subscribe(() => {
      this.carregarTarefas();
      this.novaTarefaDescricao = '';
    });
  }

  deletarTarefa(id: number | undefined): void {
    if (!id) return;
    this.tarefaService.deleteTarefa(id).subscribe(() => {
      this.carregarTarefas();
    });
  }

  toggleConcluida(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;
    this.tarefaService.updateTarefa(tarefa).subscribe();
  }

  // 3. Crie a função de sair
  sair(): void {
    this.authService.logout(); // Limpa o token
    this.router.navigate(['/login']); // Manda pro login
  }
}
