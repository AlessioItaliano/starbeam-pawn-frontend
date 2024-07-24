import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";

import { Observable } from "rxjs";
import { ResponsiveService } from "../../../services/responsive.service";
import { AuthLogoutService } from "../../../services/auth-logout.service";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatListModule,
  ],
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent {
  isMobile$: Observable<boolean>;

  constructor(
    private responsiveService: ResponsiveService,
    private authLogOutService: AuthLogoutService
  ) {
    this.isMobile$ = this.responsiveService.isMobile$;
  }

  onLogout() {
    this.authLogOutService.logout();
  }
}
