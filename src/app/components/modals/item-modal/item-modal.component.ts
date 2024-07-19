import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-item-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
  ],
  templateUrl: "./item-modal.component.html",
  styleUrl: "./item-modal.component.scss",
})
export class ItemModalComponent {
  readonly dialogRef = inject(MatDialogRef<ItemModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  price: number = this.data.price || 0;
  commission: number = this.data.commission || 0;
  priceHistory: any = this.data.priceHistory;

  displayedColumns: string[] = ["date", "price", "commission"];

  onNoClick(): void {
    this.dialogRef.close();
  }

  changePrice(): void {
    this.dialogRef.close({ price: this.price, commission: this.commission });
  }
}
