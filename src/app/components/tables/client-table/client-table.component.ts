import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ApiService } from "../../../services/api.service";
import { IClient } from "../../../interface/client.interface";
import { LoaderService } from "../../../services/loader.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-client-table",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./client-table.component.html",
  styleUrls: ["./client-table.component.scss"],
})
export class ClientTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "client",
    "email",
    "phone",
    "passport",
    "taxNumber",
  ];
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource<IClient>();
  itemsBase: IClient[] = [];
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.apiService.getAllClients().subscribe((data: IClient[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;
      this.isLoading = false;
      this.loaderService.hide();
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
