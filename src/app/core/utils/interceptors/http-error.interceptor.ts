import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Injecter le Router via `inject()`

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse && event.status === 503) {
        router.navigate(['/page-unauthorized']);
      }
    }),
    catchError((error) => {
      console.error('Erreur HTTP:', error);
      return throwError(error);
    })
  );
};
