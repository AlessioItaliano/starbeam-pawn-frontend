import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ApiService } from "../../../services/api.service";
// import { LoaderService } from "../../../services/loader.service";

import { IClient } from "../../../interface/client.interface";
import { IColumnConfig } from "../../../interface/column-config.interface";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TableComponent } from "../table/table.component";
import { LoaderService } from "../../../services/loader.service";

@Component({
  selector: "app-client-table",
  standalone: true,
  imports: [TableComponent],
  templateUrl: "./client-table.component.html",
  styleUrls: ["./client-table.component.scss"],
})
export class ClientTableComponent implements OnInit {
  public columnConfigs: IColumnConfig[] = [
    // {
    //   columnDef: "id",
    //   header: "ID",
    //   cell: (element: IClient) => `${element._id}`,
    // },
    {
      columnDef: "client",
      header: "Client",
      cell: (element: IClient) =>
        `${element.lastName} ${element.firstName} ${element.patronymic}`,
    },
    {
      columnDef: "email",
      header: "Email",
      cell: (element: IClient) => `${element.email}`,
    },
    {
      columnDef: "phone",
      header: "Phone",
      cell: (element: IClient) => `${element.phone}`,
    },
    {
      columnDef: "passport",
      header: "Passport",
      cell: (element: IClient) =>
        `${element.passport.passportSerie} ${element.passport.passportNumber}`,
    },
    {
      columnDef: "taxNumber",
      header: "Tax number",
      cell: (element: IClient) => `${element.taxNumber}`,
    },
  ];

  public dataSource: MatTableDataSource<IClient> =
    new MatTableDataSource<IClient>();
  public itemsBase: IClient[] = [];

  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.apiService.getAllClients().subscribe((data: IClient[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;
      this.loaderService.hide();
    });
  }
}
