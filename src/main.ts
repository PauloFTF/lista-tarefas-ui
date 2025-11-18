import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

// CORREÇÃO: Mude 'App' para 'AppComponent'
import { AppComponent } from './app/app'; // <-- CORRIJA ESTA LINHA

// E CORRIJA ESTA LINHA
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
