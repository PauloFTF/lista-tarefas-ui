import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaService } from '../tarefa';
import { AuthService } from '../auth/auth';

// --- IMPORTAÇÕES ---
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip'; // <--- NOVO

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatTooltipModule // <--- ADICIONE AQUI TAMBÉM
  ],
  templateUrl: './tarefas.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent implements OnInit {
  // ... O resto da lógica continua EXATAMENTE igual ...
  // (Não precisa mudar nada no código abaixo do export class)

  tarefas: Tarefa[] = [];
  novaTarefaDescricao: string = "";
  tarefaEmEdicao: Tarefa | null = null;

  constructor(
    private tarefaService: TarefaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
      this.tarefaService.getTarefas().subscribe(tarefasRecebidas => {
        this.tarefas = tarefasRecebidas;
      });
  }

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

  prepararEdicao(tarefa: Tarefa): void {
    this.tarefaEmEdicao = tarefa;
    this.novaTarefaDescricao = tarefa.descricao;
  }

  cancelarEdicao(): void {
    this.tarefaEmEdicao = null;
    this.novaTarefaDescricao = "";
  }

  atualizarTarefaEditada(): void {
    if (this.tarefaEmEdicao && this.novaTarefaDescricao.trim() !== '') {
      this.tarefaEmEdicao.descricao = this.novaTarefaDescricao;
      this.tarefaService.updateTarefa(this.tarefaEmEdicao).subscribe(() => {
        this.carregarTarefas();
        this.cancelarEdicao();
      });
    }
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

  sair(): void {
    this.authService.logout();
  }
}
