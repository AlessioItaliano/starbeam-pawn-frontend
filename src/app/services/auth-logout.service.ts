import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ApiService } from "./api.service";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class AuthLogoutService {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {}

  logout() {
    return this.apiService
      .logout()
      .pipe(
        catchError((error: any) => {
          console.error(error.message);
          this.notification.showError("Something went wrong. Try again...");
          return of(null);
        })
      )
      .subscribe(() => {
        this.router.navigate(["/"]);
      });
  }
}
