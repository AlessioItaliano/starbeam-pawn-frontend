import { Directive, ElementRef, Renderer2, OnDestroy } from "@angular/core";
import { ResponsiveService } from "../../services/responsive.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appIsTablet]",
  standalone: true,
})
export class IsTabletDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private responsiveService: ResponsiveService
  ) {
    this.subscription = this.responsiveService.isTablet$.subscribe(
      (isTablet) => {
        if (isTablet) {
          this.renderer.addClass(this.el.nativeElement, "tablet-size");
        } else {
          this.renderer.removeClass(this.el.nativeElement, "tablet-size");
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
