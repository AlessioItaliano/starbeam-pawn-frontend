import { Component } from "@angular/core";
import { ClientTableComponent } from "../../components/tables/client-table/client-table.component";

import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";

@Component({
  selector: "app-clients-page",
  standalone: true,
  imports: [
    ClientTableComponent,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
  ],
  templateUrl: "./clients-page.component.html",
  styleUrl: "./clients-page.component.scss",
})
export class ClientsPageComponent {}
