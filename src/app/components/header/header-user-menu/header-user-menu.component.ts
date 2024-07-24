import { Component, OnInit } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { firstValueFrom } from "rxjs";

import { ApiService } from "../../../services/api.service";
import { AuthLogoutService } from "../../../services/auth-logout.service";

@Component({
  selector: "app-header-user-menu",
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: "./header-user-menu.component.html",
  styleUrl: "./header-user-menu.component.scss",
})
export class HeaderUserMenuComponent implements OnInit {
  currentUserProfile = this.apiService.currentUserProfile;

  constructor(
    private apiService: ApiService,
    private authLogOutService: AuthLogoutService
  ) {}

  ngOnInit() {
    firstValueFrom(this.apiService.getCurrentUser());
  }

  onLogout() {
    this.authLogOutService.logout();
  }
}
