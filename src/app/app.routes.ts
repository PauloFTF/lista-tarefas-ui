import { Routes } from '@angular/router';

// Importe seus componentes
// Note que não precisamos do .ts no final, o Angular entende.
import { LoginComponent } from './auth/login/login';
import { TarefasComponent } from './tarefas/tarefas';

export const routes: Routes = [
    // Rota 1: Se o caminho for vazio (raiz), redireciona para 'login'
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Rota 2: O caminho '/login' carrega a tela de Login
    { path: 'login', component: LoginComponent },

    // Rota 3: O caminho '/tarefas' carrega a Lista de Tarefas
    { path: 'tarefas', component: TarefasComponent }
];
