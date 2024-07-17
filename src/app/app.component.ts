import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
// import { LoaderService } from "./services/loader.service";
// import { Observable } from "rxjs";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterOutlet,
    CommonModule,
    MatSnackBarModule,
    // MatProgressSpinnerModule,
  ],
})
export class AppComponent {
  // isLoading: Observable<boolean>;
  // constructor(private loaderService: LoaderService) {
  //   this.isLoading = this.loaderService.loaderState;
  // }
}
