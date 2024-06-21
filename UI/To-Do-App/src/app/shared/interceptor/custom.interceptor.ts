import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  let token = sessionStorage.getItem('Token');
  req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          toaster.error('Un Authorized');
        } else {
          toaster.error('Http Error ' + err.message);
        }
      } else {
        toaster.error(err.message);
      }
      return throwError(() => err);
    })
  );
};
