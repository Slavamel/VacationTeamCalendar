import { Component, OnInit } from '@angular/core';
import { HolidayServiceMock } from 'src/app/services/holiday/holiday.service.mock';
import { Holiday } from 'src/app/models/holiday.model';
import { StyleService } from 'src/app/services/style/style.service';

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

  constructor(private holidayService: HolidayServiceMock, private styleService: StyleService) { }

  ngOnInit() {
    this.initCountryHolidays();
  }

  onSaveClicked(): void {
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
    const holiday = new Holiday(this.startDate, this.endDate);
    this.holidays.push(holiday);
    this.styleService.changeHolidayHighlightedClass(holiday, true);
    this.startDate = null;
    this.endDate = null;
  }

  onRemoveHolidayClicked(index): void {
    this.styleService.changeHolidayHighlightedClass(this.holidays[index], false);
    this.holidays = this.holidays.filter((h, i) => i != index);
  }

  private initCountryHolidays(): void {
    this.holidayService.getCountryHolidays(this.year)
      .then(holidays => this.holidays = holidays)
      .finally(() => this.isLoading = false);
  }
}
