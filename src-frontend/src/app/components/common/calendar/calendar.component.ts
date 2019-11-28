import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

import { Month } from 'src/app/models/month.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Holiday } from 'src/app/models/holiday.model';
import { StyleService } from 'src/app/services/style/style.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() calendarLoaded = new EventEmitter<number>();
  @Input() isHolidaysHighlighted: boolean;
  @Input() year: number;
  @Input() holidays: Holiday[];

  monthes: Month[];

  constructor(
    private calendarService: CalendarService, 
    private styleService: StyleService) { }

  ngOnInit() {
    this.init(this.year);
  }

  ngAfterViewInit() {
    this.styleService.setHolidaysStyles(this.holidays, this.isHolidaysHighlighted);
  }

  onCurrentYearChanged(year: number): void {
    this.init(year);
  }

  getDateId(monthNum: number, date: number): string {
    if (!date) return "";
    return "date-" + (monthNum + 1) + "-" + date;
  }

  private init(year: number): void {
    this.monthes = this.calendarService.getCalendar(year);
    this.calendarLoaded.emit(year);
  }
}
