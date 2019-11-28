import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

import { Month } from 'src/app/models/month.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Holiday } from 'src/app/models/holiday.model';
import { StyleService } from 'src/app/services/style/style.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Output() calendarLoaded = new EventEmitter<number>();
  @Input() isHolidaysHighlighted: boolean;
  @Input() year: number;
  @Input() holidays: Holiday[];

  monthes: Month[];

  constructor(
    private calendarService: CalendarService, 
    private styleService: StyleService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["year"]) {
      this.monthes = this.calendarService.getCalendar(this.year);
    }
  }

  ngAfterViewInit(): void {
    this.styleService.setHolidaysStyles(this.holidays, this.isHolidaysHighlighted);
  }

  ngAfterViewChecked(): void {
    this.calendarLoaded.emit(this.year);
  }

  getDateId(monthNum: number, date: number): string {
    if (!date) return "";
    return "date-" + (monthNum + 1) + "-" + date;
  }
}
