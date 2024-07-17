import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ApiService } from "../../../services/api.service";
import { NotificationService } from "../../../services/notification.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ClientDataService } from "../../../services/client.service";
import { IClient } from "../../../interface/client.interface";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-item-form",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: "./item-form.component.html",
  styleUrls: ["./item-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent {
  today: Date = new Date();

  itemForm = new FormGroup({
    itemName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF0-9'\\s-]{2,}$"),
    ]),
    category: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    estimatedPrice: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern("[0-9]+"),
    ]),
    commission: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern("[0-9]+"),
    ]),
    dateOfAcceptance: new FormControl<Date | null>(null, [Validators.required]),
    dateValidUntil: new FormControl<Date | null>(null, [Validators.required]),
    clientId: new FormControl<string | null>(null, [Validators.required]),
  });

  // picker1: any;
  // picker2: any;

  categoryItems = [
    { label: "Jewelry", value: "jewelry" },
    { label: "Electronics", value: "electronics" },
    { label: "Watches", value: "watches" },
    { label: "Tools", value: "tools" },
    { label: "Musical Instruments", value: "musical_instruments" },
    { label: "Sporting Goods", value: "sporting_goods" },
    { label: "Luxury Items", value: "luxury_items" },
    { label: "Collectibles", value: "collectibles" },
    { label: "Household Items", value: "household_items" },
    { label: "Miscellaneous", value: "miscellaneous" },
  ];

  public clientData: IClient | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService,
    private clientDataService: ClientDataService
  ) {}

  ngOnInit() {
    this.clientDataService.getClientData().subscribe((data: IClient | null) => {
      this.clientData = data;

      if (this.clientData) {
        this.itemForm.patchValue({
          clientId: this.clientData._id,
        });
      }
    });

    this.itemForm.patchValue({
      dateOfAcceptance: this.today,
    });
  }

  onReturn(): void {
    this.clientDataService.setClientData(null);
    this.router.navigate(["/create-contract"]);
  }

  onSubmit(): void {
    console.log(this.itemForm.value);
    if (this.itemForm.invalid) {
      return;
    }
    //@ts-ignore
    this.apiService.createItem(this.itemForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.notification.showSuccess("Item created successfully");
        this.clientDataService.setClientData(null);
        this.router.navigate(["/"]);
      },
      (error: any) => {
        console.error(error.message);
        this.notification.showError("Failed to create item");
      }
    );
  }
}
