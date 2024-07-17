import { Component } from "@angular/core";
import { ClientTableComponent } from "../../components/tables/client-table/client-table.component";

@Component({
  selector: "app-clients-page",
  standalone: true,
  imports: [ClientTableComponent],
  templateUrl: "./clients-page.component.html",
  styleUrl: "./clients-page.component.scss",
})
export class ClientsPageComponent {}
