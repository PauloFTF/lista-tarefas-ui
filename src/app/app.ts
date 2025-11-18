import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// 1. Importe seu componente de tarefas (que agora funciona!)
import { TarefasComponent } from './tarefas/tarefas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TarefasComponent // 2. Adicione-o aqui
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'lista-tarefas-ui';
}
