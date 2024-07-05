import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { canActivateAuth } from './guards/accese.guard';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'profile',
    component: LayoutComponent,
    children: [{ path: 'profile', component: UserProfilePageComponent }],
    canActivate: [canActivateAuth],
  },
];
