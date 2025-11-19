import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaService } from '../tarefa';
import { AuthService } from '../auth/auth';

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

  // NOVO: Variável para guardar a tarefa que está a ser editada
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

  // NOVO: Prepara o formulário para edição
  prepararEdicao(tarefa: Tarefa): void {
    this.tarefaEmEdicao = tarefa; // Guarda a tarefa atual
    this.novaTarefaDescricao = tarefa.descricao; // Sobe o texto para o input
  }

  // NOVO: Cancela a edição e limpa o input
  cancelarEdicao(): void {
    this.tarefaEmEdicao = null;
    this.novaTarefaDescricao = "";
  }

  // NOVO: Envia a atualização para o Java
  atualizarTarefaEditada(): void {
    if (this.tarefaEmEdicao && this.novaTarefaDescricao.trim() !== '') {
      // Atualiza a descrição da tarefa em memória
      this.tarefaEmEdicao.descricao = this.novaTarefaDescricao;

      // Chama o serviço
      this.tarefaService.updateTarefa(this.tarefaEmEdicao).subscribe(() => {
        this.carregarTarefas(); // Recarrega a lista
        this.cancelarEdicao();  // Volta ao estado normal
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
