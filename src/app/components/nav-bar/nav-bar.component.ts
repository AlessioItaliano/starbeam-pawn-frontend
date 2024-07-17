import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {}
