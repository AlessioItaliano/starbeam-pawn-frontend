import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  inject,
} from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ApiService } from "../../../services/api.service";
import { Router } from "@angular/router";
import { IItems } from "../../../interface/items.interface";
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
import { ItemModalComponent } from "../../modals/item-modal/item-modal.component";
import { NotificationService } from "../../../services/notification.service";

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

  columnsToDisplayWithExpand: string[] = [
    // ...this.columnsToDisplay.map((column: any) => column.key),
    ...this.columnsToDisplay,
    // "description",
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.apiService.getAllItems().subscribe((data: IItems[]) => {
      this.itemsBase = data;
      this.dataSource.data = this.itemsBase;
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

  // toShowPriceHistory(item: any): void {
  //   console.log(item.priceHistory);
  // }

  toUpdate(item: any): void {
    console.log(item._id);
    console.log(item.priceHistory);
    const dialogRef = this.dialog.open(ItemModalComponent, {
      data: { price: item.estimatedPrice, commission: item.commission, priceHistory: item.priceHistory},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
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
