import { Component, OnInit } from '@angular/core';

// 1. Importe os módulos necessários
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 2. CORREÇÃO: O caminho agora é '../tarefa' (sem .service)
import { Tarefa, TarefaService } from '../tarefa';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tarefas.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];
  novaTarefaDescricao: string = "";

  constructor(private tarefaService: TarefaService) {}

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
}
