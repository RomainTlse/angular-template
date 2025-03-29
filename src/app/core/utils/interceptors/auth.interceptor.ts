import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log('authService', authService);

  const token = authService.token; // Supposons que le token soit dans localStorage ou directement accessible via le service.

  console.log('token', token);
  if (token) {
    console.log(token);
    // Ajouter le token à l'en-tête de la requête
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
