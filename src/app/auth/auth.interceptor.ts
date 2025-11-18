import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 1. Tenta pegar o token que salvamos no navegador
  const token = localStorage.getItem('meu-token');

  // 2. Se o token existir...
  if (token) {
    // ...nós clonamos a requisição (porque a original é imutável)
    // e adicionamos o cabeçalho 'Authorization' com o token.
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Envia a requisição modificada (com o token)
    return next(authReq);
  }

  // 3. Se não tiver token, envia a requisição normal (sem nada)
  return next(req);
};
