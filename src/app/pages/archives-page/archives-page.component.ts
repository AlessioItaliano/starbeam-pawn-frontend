import { Component } from "@angular/core";
import { ArchivesTableComponent } from "../../components/tables/archives-table/archives-table.component";

@Component({
  selector: "app-archives-page",
  standalone: true,
  imports: [ArchivesTableComponent],
  templateUrl: "./archives-page.component.html",
  styleUrl: "./archives-page.component.scss",
})
export class ArchivesPageComponent {}
