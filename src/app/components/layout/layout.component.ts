import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../header/header/header.component";
import { CommonModule } from "@angular/common";
import { LoadingSpinerComponent } from "../loading-spiner/loading-spiner.component";

@Component({
  selector: "app-layout",
  standalone: true,
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    LoadingSpinerComponent,
  ],
})
export class LayoutComponent {}
