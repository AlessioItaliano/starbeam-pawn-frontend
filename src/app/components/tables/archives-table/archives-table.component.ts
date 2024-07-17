import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ApiService } from "../../../services/api.service";
import { IClient } from "../../../interface/client.interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { IItems } from "../../../interface/items.interface";

@Component({
  selector: "app-archives-table",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./archives-table.component.html",
  styleUrl: "./archives-table.component.scss",
})
export class ArchivesTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "itemName",
    "price",
    "commission",
    "client",
  ];
  dataSource: MatTableDataSource<IItems> = new MatTableDataSource<IItems>();
  itemsBase: IItems[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getArchiveItems().subscribe((data: IItems[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;

      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
