import { Component } from "@angular/core";
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { ApiService } from "../../../services/api.service";
import { ClientDataService } from "../../../services/client.service";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-search-client-form",
  standalone: true,
  templateUrl: "./search-client-form.component.html",
  styleUrl: "./search-client-form.component.scss",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class SearchClientFormComponent {
  taxNumberForm = new FormGroup({
    taxNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("[0-9]{10}"),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private clientDataService: ClientDataService,
    private notification: NotificationService
  ) {}

  onSubmit(): void {
    if (this.taxNumberForm.invalid) {
      return;
    }
    const taxNumberValue = this.taxNumberForm.value.taxNumber;
    //@ts-ignore
    this.apiService.getClientByTaxNumber(taxNumberValue).subscribe(
      (res: any) => {
        if (!res) {
          this.notification.showError("Client is not found");
          return;
        }
        this.clientDataService.setClientData(res);
        this.notification.showSuccess("Client is found");
      },
      (error: any) => {
        console.error(error.message);
        this.notification.showError("Client is not found");
      }
    );
  }
}
