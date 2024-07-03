import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { routePaths } from '../route-paths/route-paths';
import { TaskService } from '../../services/task/task.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user/user.service';
import { ApiResponse } from '../../models/ApiResponse';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  const router=inject(Router);
  const taskService=inject(TaskService);
  const userService=inject(UserService);
  const helper = new JwtHelperService();
  let accessToken = sessionStorage.getItem('AccessToken');
  let refreshToken = sessionStorage.getItem('RefreshToken');
  const isAccessTokenExpired = helper.isTokenExpired(accessToken);
  const isRefreshTokenExpired = helper.isTokenExpired(refreshToken);
  if(accessToken && isAccessTokenExpired && !isRefreshTokenExpired)
    {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${refreshToken}`),
        });
    }
    else{
    req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status==401)
      {
        toaster.error("please login")
        router.navigate(routePaths.index);
        taskService.isLoading$.next(false);
        sessionStorage.removeItem('AccessToken');
        sessionStorage.removeItem('RefreshToken');
      }
      return throwError(() => error);
    }));
}
