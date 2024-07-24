// import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
// import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
// import { MatSort, MatSortModule } from "@angular/material/sort";
// import { MatTableDataSource, MatTableModule } from "@angular/material/table";
// import { MatInputModule } from "@angular/material/input";
// import { MatFormFieldModule } from "@angular/material/form-field";

// import { ApiService } from "../../../services/api.service";

// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { IItems } from "../../../interface/items.interface";

import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ApiService } from "../../../services/api.service";
// import { LoaderService } from "../../../services/loader.service";

import { IItems } from "../../../interface/items.interface";
import { IColumnConfig } from "../../../interface/column-config.interface";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { TableComponent } from "../table/table.component";
import { LoaderService } from "../../../services/loader.service";
@Component({
  selector: "app-archives-table",
  standalone: true,
  imports: [TableComponent],
  templateUrl: "./archives-table.component.html",
  styleUrl: "./archives-table.component.scss",
})
export class ArchivesTableComponent implements OnInit {
  public columnConfigs: IColumnConfig[] = [
    {
      columnDef: "id",
      header: "ID",
      cell: (element: any) => `${element._id}`,
    },
    {
      columnDef: "itemName",
      header: "Item name",
      cell: (element: any) => `${element.itemName}`,
    },
    {
      columnDef: "price",
      header: "Price",
      cell: (element: any) => `${element.estimatedPrice}`,
    },
    {
      columnDef: "commission",
      header: "Commission",
      cell: (element: any) => `${element.commission}`,
    },
    {
      columnDef: "client",
      header: "Client",
      cell: (element: any) =>
        `${element.clientId.lastName} ${element.clientId.firstName} ${element.clientId.patronymic}`,
    },
  ];

  dataSource: MatTableDataSource<IItems> = new MatTableDataSource<IItems>();
  itemsBase: IItems[] = [];
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.apiService.getArchiveItems().subscribe((data: IItems[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;
      this.loaderService.hide();
    });
  }
}
