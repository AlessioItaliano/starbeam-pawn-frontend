import { inject } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router, UrlTree } from "@angular/router";

export const canActivateAuth = (): boolean | UrlTree => {
  const isLoggedIn: boolean = inject(ApiService).isAuth;

  if (isLoggedIn) {
    return true;
  }
  return inject(Router).createUrlTree(["./"]);
};
