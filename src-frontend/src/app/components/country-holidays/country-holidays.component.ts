import { Component, OnInit } from '@angular/core';
import { HolidayServiceMock } from 'src/app/services/holiday/holiday.service.mock';
import { Holiday } from 'src/app/models/holiday.model';

@Component({
  selector: 'app-country-holidays',
  templateUrl: './country-holidays.component.html',
  styleUrls: ['./country-holidays.component.css']
})
export class CountryHolidaysComponent implements OnInit {
  year = 2019;
  holidays: Holiday[];

  startDate: Date;
  endDate: Date;

  isLoading: boolean;

  constructor(private holidayService: HolidayServiceMock) { }

  ngOnInit() {
    this.initCountryHolidays();
  }

  onStartDateChanged(date: string): void {
    this.startDate = new Date(date);
  }

  onEndDateChanged(date: string): void {
    this.endDate = new Date(date);
  }

  onAddHolidayClicked(): void {
    if (!this.startDate || !this.endDate) return;
    if (this.startDate > this.endDate) return;
    this.holidays.push(new Holiday(this.startDate, this.endDate));
    this.startDate = null;
    this.endDate = null;
  }

  onRemoveHolidayClicked(index): void {
    this.holidays.splice(index, 1);
  }

  private initCountryHolidays(): void {
    this.holidayService.getCountryHolidays(this.year)
      .then(holidays => this.holidays = holidays)
      .finally(() => this.isLoading = false);
  }
}
