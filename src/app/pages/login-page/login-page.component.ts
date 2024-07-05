import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('[A-Za-z0-9]{8,16}'),
    ]),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      //@ts-ignore
      this.apiService.login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          console.error(error.message);
        }
      );
    }
  }
}
