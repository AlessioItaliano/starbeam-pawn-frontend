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
import { ItemModalComponent } from "../../modals/item-modal";

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
  ],
})
export class ItemTableComponent {
  readonly dialog = inject(MatDialog);
  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<IItems> = new MatTableDataSource<IItems>();
  // columnsToDisplay = ["name", "weight", "symbol", "position"];

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

  // columnsToDisplay: any = [
  //   { key: "dateOfAcceptance", label: "Signed Date" },
  //   { key: "dateValidUntil", label: "Expiration Date" },
  //   { key: "itemName", label: "Item Name" },
  //   { key: "description", label: "Description" },
  //   { key: "estimatedPrice", label: "Price" },
  //   { key: "commission", label: "Commission" },
  // {
  //   key: "clientId",
  //   label: "Client",
  //   // custom: (element: any) =>
  //   //   `${element.clientId.firstName} ${element.clientId.lastName} ${element.clientId.patronymic}`,
  // },
  // {
  //   key: "pawnUser",
  //   label: "Pawn User",
  //   // custom: (element: any) =>
  //   //   `${element.pawnUser.firstName} ${element.pawnUser.lastName} ${element.pawnUser.patronymic}`,
  // },
  // ];

  columnsToDisplayWithExpand: string[] = [
    // ...this.columnsToDisplay.map((column: any) => column.key),
    ...this.columnsToDisplay,
    // "description",
  ];

  expandedElement: IItems | null = null;
  itemsBase: IItems[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router) {}
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

  // toUpdate(id: string): void {
  //   console.log(id);
  // }

  toUpdate(): void {
    const dialogRef = this.dialog.open(
      ItemModalComponent
      // {
      // data: { name: this.name(), animal: this.animal() },
      // }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  toRemoveAndAddToArchive(id: string): void {
    this.apiService.moveToArchive(id).subscribe((data: any) => {
      console.log(data);
      // Видаляємо елемент з itemsBase
      this.itemsBase = this.itemsBase.filter((item) => item._id !== id);
      // Оновлюємо dataSource
      this.dataSource.data = this.itemsBase;
    });
    console.log(id);
  }
}
