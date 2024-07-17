import { Component } from "@angular/core";
import { ItemTableComponent } from "../../components/tables/item-table/item-table.component";

@Component({
  selector: "app-transaction-page",
  standalone: true,
  imports: [ItemTableComponent],
  templateUrl: "./transaction-page.component.html",
  styleUrl: "./transaction-page.component.scss",
})
export class TransactionPageComponent {}
