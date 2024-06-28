import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { routePaths } from '../route-paths/route-paths';
import { TaskService } from '../../services/task/task.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  const router=inject(Router);
  const taskService=inject(TaskService);
  let token = sessionStorage.getItem('Token');
  req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger
      if(error.status==401)
      {
        toaster.error("please login")
        router.navigate(routePaths.index);
        taskService.isLoading$.next(false);
        sessionStorage.removeItem('Token');
      }
      return throwError(() => error);
    })
  );
};
