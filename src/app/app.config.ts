import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// 1. Importe 'withInterceptors' e o seu 'authInterceptor' criado
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 2. AQUI ESTÁ A MUDANÇA:
    // Adicionamos 'withInterceptors([authInterceptor])' dentro do provideHttpClient
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ]
};
