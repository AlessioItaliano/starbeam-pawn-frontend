import { Component } from "@angular/core";

import { LoginFormComponent } from "../../components/forms/login-form/login-form.component";

import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";
@Component({
  selector: "app-login-page",
  standalone: true,
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
  imports: [
    LoginFormComponent,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
  ],
})
export class LoginPageComponent {}
