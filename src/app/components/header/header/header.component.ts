import { Component } from "@angular/core";
import { LogoComponent } from "../../logo/logo.component";
import { HeaderNavComponent } from "../header-nav/header-nav.component";
import { HeaderAuthMenuComponent } from "../header-auth-menu/header-auth-menu.component";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [LogoComponent, HeaderNavComponent, HeaderAuthMenuComponent],
})
export class HeaderComponent {}
