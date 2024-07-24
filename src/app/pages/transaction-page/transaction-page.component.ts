import { Component } from "@angular/core";
import { ItemTableComponent } from "../../components/tables/item-table/item-table.component";

import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";
@Component({
  selector: "app-transaction-page",
  standalone: true,
  imports: [
    ItemTableComponent,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
  ],
  templateUrl: "./transaction-page.component.html",
  styleUrl: "./transaction-page.component.scss",
})
export class TransactionPageComponent {}
