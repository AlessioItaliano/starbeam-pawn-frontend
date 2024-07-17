import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { authTokenInterceptor } from "./interceptors/auth.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    MatSnackBarModule,
  ],
};
