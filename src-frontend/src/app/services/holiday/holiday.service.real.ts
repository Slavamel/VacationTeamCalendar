import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HolidayServiceBase } from './holiday.service.base';
import { Holiday } from 'src/app/models/holiday.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidayServiceReal extends HolidayServiceBase {
  constructor(private http: HttpClient) { super(); }

  getCountryHolidays(year: number): Promise<Holiday[]> {
    return this.http.get<Holiday[]>(environment.url + `/api/holiday/get-country-holidays/${year}`, {withCredentials: true}).toPromise();
  }

  saveCountryHolidays(holidays: Holiday[]): Promise<Holiday[]> {
    throw new Error("Not implemented");
  }
}
