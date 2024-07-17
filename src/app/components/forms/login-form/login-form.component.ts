import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ApiService } from "../../../services/api.service";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  logInForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern("[A-Za-z0-9]{8,16}"),
    ]),
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    if (this.logInForm.valid) {
      //@ts-ignore
      this.apiService.login(this.logInForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(["/"]);
        },
        (error: any) => {
          console.error(error.message);
        }
      );
    }
  }
}
