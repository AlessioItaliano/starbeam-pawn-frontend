import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SvgIconComponent } from "../../components/svg-icon/svg-icon.component";
import { LoginFormComponent } from "../../components/forms/login-form/login-form.component";

@Component({
  selector: "app-login-page",
  standalone: true,
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgIconComponent,
    LoginFormComponent,
  ],
})
export class LoginPageComponent {
  // loginForm = new FormGroup({
  //   email: new FormControl<string | null>(null, [
  //     Validators.required,
  //     Validators.email,
  //   ]),
  //   password: new FormControl<string | null>(null, [
  //     Validators.required,
  //     Validators.minLength(8),
  //     Validators.maxLength(16),
  //     Validators.pattern("[A-Za-z0-9]{8,16}"),
  //   ]),
  // });

  // isPasswordVisible = signal<boolean>(false);

  // constructor(private apiService: ApiService, private router: Router) {}

  // togglePasswordVisibility(): void {
  //   this.isPasswordVisible.set(!this.isPasswordVisible());
  // }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     //@ts-ignore
  //     this.apiService.login(this.loginForm.value).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.router.navigate(["/"]);
  //       },
  //       (error: any) => {
  //         console.error(error.message);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
    // if (this.logInForm.valid) {
    //   // console.log(this.loginForm.value);
    //   //@ts-ignore
    //   this.apiService.login(this.loginForm.value).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigate(["/"]);
    //     },
    //     (error: any) => {
    //       console.error(error.message);
    //     }
    //   );
    // }
  }
}
