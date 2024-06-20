import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  let token=sessionStorage.getItem('Token');
  req=req.clone({
    headers:req.headers.set('Authorization',`Bearer ${token}`)
  });
  return next(req).pipe(catchError((err:any)=>
  {
    if(err instanceof HttpErrorResponse)
    {
      if(err.status==401)
      {
        console.log("Un Authorized");
      }
      else{
        console.log("HTTP error:",err);
      }
    }
    else
    {
      console.log("Non Http Error:",err);
    }
    return throwError(()=>err);
  }
  ));
};
