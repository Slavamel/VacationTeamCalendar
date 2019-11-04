import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Month } from 'src/app/models/month.model';
import { HolidayServiceBase } from 'src/app/services/holiday/holiday.service.base';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() calendarLoaded = new EventEmitter<number>();
  @Input() isHolidaysHighlighted: boolean;
  monthes: Month[];
  year = new Date().getFullYear();
  isLoading = false;

  constructor(
    private holidayService: HolidayServiceBase, 
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.init(this.year);
  }

  onCurrentYearChanged(year: number): void {
    this.init(year);
  }

  getDateId(monthNum: number, date: number): string {
    if (!date) return "";
    return "date-" + (monthNum + 1) + "-" + date;
  }

  private init(year: number): void {
    this.isLoading = true;
    this.monthes = null;

    this.holidayService.getCountryHolidays(year)
      .then((holidays) => {
        this.monthes = this.calendarService.getCalendar(year, holidays);
        this.calendarLoaded.emit(year);
      })
      .finally(() => this.isLoading = false);
  }
}
