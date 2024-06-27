import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routePaths } from '../route-paths/route-paths';
import { JwtHelperService } from '@auth0/angular-jwt';
export const authGuard: CanActivateFn = (route, state) => {
  const toaster: ToastrService = inject(ToastrService);
  const router: Router = inject(Router);
  const helper = new JwtHelperService();
  const token = sessionStorage.getItem('Token');
  const isExpired = helper.isTokenExpired(token);
  debugger
  if (token != null && !isExpired) {
    return true;
  } else {
    sessionStorage.removeItem('Token')
    toaster.error('please login to continue');
    router.navigate(routePaths.index);
    return false;
  }
};
