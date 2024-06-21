import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token = sessionStorage.getItem('Token');
  if (token != null) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
