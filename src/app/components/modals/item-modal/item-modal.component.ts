import {
  // ChangeDetectionStrategy,
  Component,
  inject,
  // model,
  // signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  // MAT_DIALOG_DATA,
  // MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  changePrice(): void {
    this.dialogRef.close({ price: this.price, commission: this.commission });
  }
}
