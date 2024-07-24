import { Component } from "@angular/core";
import { LogoComponent } from "../../logo/logo.component";
import { HeaderUserMenuComponent } from "../header-user-menu/header-user-menu.component";
import { HeaderClockDateComponent } from "../header-clock-date/header-clock-date.component";
// import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ResponsiveService } from "../../../services/responsive.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [
    LogoComponent,
    HeaderUserMenuComponent,
    HeaderClockDateComponent,
    NavBarComponent,
    IsTabletDirective,
    IsLaptopDirective,
    CommonModule,
  ],
})
export class HeaderComponent {
  isMobile$: Observable<boolean>;

  constructor(private responsiveService: ResponsiveService) {
    this.isMobile$ = this.responsiveService.isMobile$;
  }
}
