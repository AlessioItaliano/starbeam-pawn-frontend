import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  private customBreakpoints = {
    XSmall: "(min-width: 360px) and (max-width: 599.99px)",
    Small: Breakpoints.Small,
    Large: Breakpoints.Large,
  };

  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([this.customBreakpoints.XSmall])
    .pipe(map((result) => result.matches));

  isTablet$: Observable<boolean> = this.breakpointObserver
    .observe([this.customBreakpoints.Small])
    .pipe(map((result) => result.matches));

  isLaptop$: Observable<boolean> = this.breakpointObserver
    .observe([this.customBreakpoints.Large])
    .pipe(map((result) => result.matches));
}
