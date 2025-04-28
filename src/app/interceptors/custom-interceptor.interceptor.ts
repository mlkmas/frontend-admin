import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import{Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, throwError } from 'rxjs';

export const customInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService=inject(LoginService);
  const router=inject(Router);

if(req.url.includes('api/authorization/administor/login')){
return next(req);
}

  const clonedReq = authService.token? req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token}`
    }
    })
    :req.clone()

    return next(clonedReq).pipe(
      catchError((error) => {
      if(error.status === 401 || error.status === 403) {
      router.navigate(['/login']);
      }
    return throwError(() => error);
      })

    );
 
};
