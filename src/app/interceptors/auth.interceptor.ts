import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { catchError, throwError } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = inject(ApiService).authToken;
  const router = inject(Router);

  if (!token) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(["/"]);
      }
      return throwError(error);
    })
  );
};
