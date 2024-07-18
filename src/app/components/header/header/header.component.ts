import { Component } from "@angular/core";
import { LogoComponent } from "../../logo/logo.component";
import { HeaderUserMenuComponent } from "../header-user-menu/header-user-menu.component";
import { HeaderClockDateComponent } from "../header-clock-date/header-clock-date.component";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [LogoComponent, HeaderUserMenuComponent, HeaderClockDateComponent],
})
export class HeaderComponent {}
