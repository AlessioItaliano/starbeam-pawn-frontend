import { Component, ViewChild, inject } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatDialog } from "@angular/material/dialog";

import { ApiService } from "../../../services/api.service";
import { LoaderService } from "../../../services/loader.service";
import { NotificationService } from "../../../services/notification.service";

import { IItems } from "../../../interface/items.interface";
import { IColumnConfig } from "../../../interface/column-config.interface";

import { ItemModalComponent } from "../../modals/item-modal/item-modal.component";
import { ContractModalComponent } from "../../modals/contract-modal/contract-modal.component";

@Component({
  selector: "app-item-table",
  standalone: true,
  templateUrl: "./item-table.component.html",
  styleUrl: "./item-table.component.scss",
  animations: [
    trigger("detailExpand", [
      state("collapsed,void", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    ItemModalComponent,
  ],
})
export class ItemTableComponent {
  readonly dialog = inject(MatDialog);
  dataSource: MatTableDataSource<IItems> = new MatTableDataSource<IItems>();
  expandedElement: IItems | null = null;
  itemsBase: IItems[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay: string[] = [
    "signedDate",
    "expirationDate",
    "category",
    "itemName",
    "price",
    "commission",
    "client",
    "pawnUser",
  ];

  public columnConfigs: IColumnConfig[] = [
    {
      columnDef: "signedDate",
      header: "Signed Date",
      cell: (element: any) => element.dateOfAcceptance,
      pipe: (value: any) => new Date(value).toLocaleDateString(),
    },
    {
      columnDef: "expirationDate",
      header: "Expiration Date",
      cell: (element: any) => element.dateValidUntil,
      pipe: (value: any) => new Date(value).toLocaleDateString(),
    },
    {
      columnDef: "category",
      header: "Category",
      cell: (element: any) => element.category,
    },
    {
      columnDef: "itemName",
      header: "Item Name",
      cell: (element: any) => element.itemName,
    },
    {
      columnDef: "description",
      header: "Description",
      cell: (element: any) => element.description,
    },
    {
      columnDef: "price",
      header: "Price",
      cell: (element: any) => element.estimatedPrice,
    },
    {
      columnDef: "commission",
      header: "Commission",
      cell: (element: any) => element.commission,
    },
    {
      columnDef: "client",
      header: "Client",
      cell: (element: any) =>
        `${element.clientId.lastName} ${element.clientId.firstName} ${element.clientId.patronymic}`,
    },
    {
      columnDef: "pawnUser",
      header: "Employee",
      cell: (element: any) =>
        `${element.pawnUser.lastName} ${element.pawnUser.firstName} ${element.pawnUser.patronymic}`,
    },
  ];

  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay];
  constructor(
    private apiService: ApiService,
    private notification: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.apiService.getAllItems().subscribe((data: IItems[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;
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

  isContractExpired(dateValidUntil: Date): boolean {
    const currentDate = new Date();
    const expirationDate = new Date(dateValidUntil);
    return expirationDate > currentDate;
  }

  toGetContract(item: any): void {
    this.dialog.open(ContractModalComponent, {
      data: item,
    });
  }

  toUpdate(item: any): void {
    const dialogRef = this.dialog.open(ItemModalComponent, {
      data: {
        price: item.estimatedPrice,
        commission: item.commission,
        priceHistory: item.priceHistory,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.apiService
          .changeItemPrice(item._id, {
            estimatedPrice: result.price,
            commission: result.commission,
          })
          .subscribe((updatedItem: IItems) => {
            const index = this.itemsBase.findIndex((i) => i._id === item._id);
            if (index !== -1) {
              this.itemsBase[index] = updatedItem;
              this.dataSource.data = this.itemsBase;
              this.notification.showSuccess("Price is update successfully");
            }
          });
      }
    });
  }

  toRemoveAndAddToArchive(id: string): void {
    this.apiService.moveToArchive(id).subscribe((data: any) => {
      this.itemsBase = this.itemsBase.filter((item) => item._id !== id);
      this.dataSource.data = this.itemsBase;
      this.notification.showSuccess("Item is added to archive");
    });
  }
}
