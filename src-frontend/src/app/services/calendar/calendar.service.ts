import { Injectable } from '@angular/core';

import { Day } from 'src/app/models/day.model';
import { Month } from 'src/app/models/month.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June",
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  getCalendar(year: number): Month[] {
    let result: Month[] = [];
    for(let i=1; i<13; i++) {
      result.push(this.getMonth(i, year));
    }

    return result;
  }

  private getMonth(monthNumber: number, year: number): Month {
    let firstDay = new Date(year, monthNumber-1, 1).getDay();
    firstDay = firstDay == 0 ? 7 : firstDay;
    const daysInMonth = new Date(year, monthNumber, 0).getDate();

    let day = 1;
    let month = [];
    let week = [];

    for (let i = 1; ; i++) {
      if (day > daysInMonth && week.length == 0) { break; }

      if (i < firstDay || day > daysInMonth) {
        week.push(new Day(""));
      } else {
        week.push(new Day(day.toString()));
        day++;
      }

      if (week.length == 7) {
        month.push(week);
        week = [];
      }
    }

    const result = new Month(this.monthNames[monthNumber-1], month);

    return result;
  }
}