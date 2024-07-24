import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-loader",
  imports: [MatProgressSpinnerModule, CommonModule],
  standalone: true,
  templateUrl: "./loading-spiner.component.html",
  styleUrl: "./loading-spiner.component.scss",
})
export class LoadingSpinerComponent {
  isLoading = this.loaderService.loaderState;

  constructor(private loaderService: LoaderService) {}
}
