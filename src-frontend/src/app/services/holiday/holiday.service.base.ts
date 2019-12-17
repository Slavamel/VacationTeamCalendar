import { Injectable } from '@angular/core';
import { Holiday } from 'src/app/models/holiday.model';


@Injectable({
  providedIn: 'root',
})
export class HolidayServiceBase {
  countryHolidays: Holiday[];

  getCountryHolidays(year: number): Promise<Holiday[]> {
    throw new Error("Not implemented");
  }

  saveCountryHolidays(holidays: Holiday[]): Promise<Holiday[]> {
    throw new Error("Not implemented");
  }

  convertToDates(holidays: Holiday[]): Holiday[] {
    holidays.forEach(h => {
      h.startDate = new Date(h.startDate);
      h.endDate = new Date(h.endDate);
    })
    return holidays;
  }
}
