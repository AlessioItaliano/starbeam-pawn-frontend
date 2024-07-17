import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(
    message: string,
    action: string = "close",
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ["success-snackbar"],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showError(
    message: string,
    action: string = "close",
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ["error-snackbar"],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
