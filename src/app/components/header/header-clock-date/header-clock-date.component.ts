import { Component, OnInit } from "@angular/core";
import { CommonModule, formatDate } from "@angular/common";
import { ResponsiveService } from "../../../services/responsive.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header-clock-date",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header-clock-date.component.html",
  styleUrls: ["./header-clock-date.component.scss"],
})
export class HeaderClockDateComponent implements OnInit {
  time: string;
  date: string;

  // isMobile$: Observable<boolean>;

  constructor() {
    this.time = this.formatTime(new Date());
    this.date = this.formatDate(new Date());
    // this.isMobile$ = this.responsiveService.isMobile$;
  }

  ngOnInit() {
    setInterval(() => {
      const currentDate = new Date();
      this.time = this.formatTime(currentDate);
      this.date = this.formatDate(currentDate);
    }, 1000);
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString();
  }

  // private formatDate(date: Date): string {
  //   return formatDate(date, "fullDate", "en-US");
  // }
  private formatDate(date: Date): string {
    return formatDate(date, "dd.MM.yyyy", "en-US");
  }
}
