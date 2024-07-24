import { Directive, ElementRef, Renderer2, OnDestroy } from "@angular/core";
import { ResponsiveService } from "../services/responsive.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appIsMobile]",
  standalone: true,
})
export class IsMobileDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private responsiveService: ResponsiveService
  ) {
    this.subscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        if (isMobile) {
          this.renderer.addClass(this.el.nativeElement, "mobile-size");
        } else {
          this.renderer.removeClass(this.el.nativeElement, "mobile-size");
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
