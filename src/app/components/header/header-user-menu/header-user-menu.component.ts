import { Component, inject } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../../services/api.service";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header-user-menu",
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: "./header-user-menu.component.html",
  styleUrl: "./header-user-menu.component.scss",
})
export class HeaderUserMenuComponent {
  // apiService = inject(ApiService);

  currentUserProfile = this.apiService.currentUserProfile;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    firstValueFrom(this.apiService.getCurrentUser());
  }

  onLogout() {
    return this.apiService.logout().subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(["/login"]);
      },
      (error: any) => {
        console.error(error.message);
      }
    );
  }
}
