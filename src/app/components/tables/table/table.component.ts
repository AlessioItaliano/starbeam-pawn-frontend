import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

import { IColumnConfig } from "../../../interface/column-config.interface";
import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";
import { ResponsiveService } from "../../../services/responsive.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
    CommonModule,
  ],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  @Input() data: T[] = [];
  @Input() columnConfigs: IColumnConfig[] = [];
  @Input() placeholder: string = "";
  @Input() title: string = "";

  public isMobile$: Observable<boolean>;
  public displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private responsiveService: ResponsiveService) {
    this.isMobile$ = this.responsiveService.isMobile$;
  }

  ngOnInit() {
    this.displayedColumns = this.columnConfigs.map((col) => col.columnDef);
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
