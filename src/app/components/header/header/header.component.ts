import { Component } from "@angular/core";
import { LogoComponent } from "../../logo/logo.component";
import { HeaderUserMenuComponent } from "../header-user-menu/header-user-menu.component";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [LogoComponent, HeaderUserMenuComponent],
})
export class HeaderComponent {}
