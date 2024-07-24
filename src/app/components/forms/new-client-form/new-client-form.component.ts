import { Component } from "@angular/core";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";

import { ApiService } from "../../../services/api.service";
import { ClientDataService } from "../../../services/client.service";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-new-client-form",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: "./new-client-form.component.html",
  styleUrls: ["./new-client-form.component.scss"],
})
export class NewClientFormComponent {
  today: Date = new Date();

  newUserForm = new FormGroup({
    firstName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF'-]{2,}"),
    ]),
    lastName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF'-]{2,}"),
    ]),
    patronymic: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF'-]{2,}"),
    ]),
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("[0-9]{10}"),
    ]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    taxNumber: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern("[0-9]{10}"),
    ]),
    passport: new FormGroup({
      passportSerie: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern("^[A-Z]{2}$"),
      ]),
      passportNumber: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern("^[0-9]{6}$"),
      ]),
      passportDateOfIssue: new FormControl<string | null>(null, [
        Validators.required,
      ]),
    }),
  });

  constructor(
    private apiService: ApiService,
    private clientDataService: ClientDataService,
    private notification: NotificationService
  ) {}

  onPassportSerieInput(): void {
    const control = this.newUserForm.get("passport.passportSerie");
    if (control) {
      control.setValue(control.value!.toUpperCase(), { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (this.newUserForm.invalid) {
      return;
    }
    //@ts-ignore
    this.apiService.createClient(this.newUserForm.value).subscribe(
      (res: any) => {
        this.clientDataService.setClientData(res);
        this.notification.showSuccess("Client created successfully");
      },
      (error: any) => {
        console.error(error.message);
        this.notification.showError("Something went wrong, try again later...");
      }
    );
  }
}
