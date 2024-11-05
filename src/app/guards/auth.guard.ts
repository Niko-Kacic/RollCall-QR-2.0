import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = await authService.isLoggedIn(); 

  if (isLoggedIn) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

