import {
  ChangeDetectorRef,
  Component,
  OnInit,
  // inject
} from "@angular/core";
import { RouterModule } from "@angular/router";
// import { ApiService } from "../../services/api.service";
import { HeaderComponent } from "../header/header/header.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
// import { Observable } from "rxjs";
// import { LoaderService } from "../../services/loader.service";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { LoadingSpinerComponent } from "../loading-spiner/loading-spiner.component";

@Component({
  selector: "app-layout",
  standalone: true,
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    NavBarComponent,
    // MatProgressSpinnerModule,
    LoadingSpinerComponent,
  ],
})
export class LayoutComponent {
  // isLoading: Observable<boolean>;
  // constructor(private loaderService: LoaderService) {
  //   // this.isLoading = this.loaderService.loading$;
  // }
}
