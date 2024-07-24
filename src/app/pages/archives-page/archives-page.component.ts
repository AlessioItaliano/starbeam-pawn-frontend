import { Component } from "@angular/core";
import { ArchivesTableComponent } from "../../components/tables/archives-table/archives-table.component";

import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";

@Component({
  selector: "app-archives-page",
  standalone: true,
  imports: [
    ArchivesTableComponent,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
  ],
  templateUrl: "./archives-page.component.html",
  styleUrl: "./archives-page.component.scss",
})
export class ArchivesPageComponent {}
