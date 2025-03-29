import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated) {
    return true;
  }

  // Rediriger l'utilisateur vers la page de connexion si non authentifié
  router.navigate(['/login']);
  return false;
};
