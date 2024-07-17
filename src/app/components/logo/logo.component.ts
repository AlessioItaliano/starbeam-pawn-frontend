import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SvgIconComponent } from "../../components/svg-icon/svg-icon.component";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [RouterModule, SvgIconComponent],
  templateUrl: "./logo.component.html",
  styleUrl: "./logo.component.scss",
})
export class LogoComponent {}
