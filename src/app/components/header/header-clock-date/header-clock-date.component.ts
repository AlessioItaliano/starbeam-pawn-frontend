import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-header-clock-date",
  standalone: true,
  templateUrl: "./header-clock-date.component.html",
  styleUrls: ["./header-clock-date.component.scss"],
})
export class HeaderClockDateComponent implements OnInit {
  time: string;
  date: string;

  constructor() {
    this.time = this.formatTime(new Date());
    this.date = this.formatDate(new Date());
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

  private formatDate(date: Date): string {
    return formatDate(date, "fullDate", "en-US");
  }
}
