import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1. EXPORTANDO A INTERFACE 'Tarefa' (o "molde" dos dados)
export interface Tarefa {
  id?: number;
  descricao: string;
  concluida: boolean;
}

@Injectable({
  providedIn: 'root'
})
// 2. EXPORTANDO A CLASSE 'TarefaService' (o "serviço")
export class TarefaService {

  private readonly API_URL = 'https://lista-tarefas-api.onrender.com/api/tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.API_URL);
  }

  addTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API_URL, tarefa);
  }

  deleteTarefa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.API_URL}/${tarefa.id}`, tarefa);
  }
}
