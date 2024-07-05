import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  signupForm = new FormGroup({
    firstName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF'-]{2,}"),
    ]),
    lastName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern("^[A-Za-z\u0400-\u04FF'-]{2,}"),
    ]),
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
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

  constructor(private router: Router, private apiService: ApiService) {}

  goToLogIn(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    //@ts-ignore
    this.apiService.signup(this.signupForm.value).subscribe(
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
