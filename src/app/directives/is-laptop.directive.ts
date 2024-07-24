import { Directive, ElementRef, Renderer2, OnDestroy } from "@angular/core";
import { ResponsiveService } from "../services/responsive.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appIsLaptop]",
  standalone: true,
})
export class IsLaptopDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private responsiveService: ResponsiveService
  ) {
    this.subscription = this.responsiveService.isLaptop$.subscribe(
      (isLaptop) => {
        if (isLaptop) {
          this.renderer.addClass(this.el.nativeElement, "laptop-size");
        } else {
          this.renderer.removeClass(this.el.nativeElement, "laptop-size");
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
