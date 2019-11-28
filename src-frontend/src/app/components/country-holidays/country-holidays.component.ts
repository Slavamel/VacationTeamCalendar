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
  year = new Date().getFullYear();
  holidays: Holiday[];

  startDate: Date;
  endDate: Date;

  error: string;

  constructor(private holidayService: HolidayServiceMock, private styleService: StyleService) { }

  ngOnInit() {
    this.initCountryHolidays();
  }

  onCurrentYearChanged(year: number): void {
    this.holidays = null;
    this.year = year;
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
    if (!this.isDatesValid()) return;
    
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

  private isDatesValid(): boolean {
    if (!this.startDate || !this.endDate) {
      this.error = "Add dates first";
      return false;
    }

    if (this.startDate > this.endDate) {
      this.error = "Swap the dates";
      return false;
    }

    if (this.startDate.getFullYear() != this.year || this.endDate.getFullYear() != this.year) {
      this.error = `Change calendar's year first`;
      return false;
    }

    if (this.isDateAlreadyExist()) {
      this.error = `The dates already exist in another holiday`;
      return false;
    }

    this.error = null;
    return true;
  }

  private initCountryHolidays(): void {
    this.holidayService.getCountryHolidays(this.year)
      .then(holidays => this.holidays = holidays);
  }

  private isDateAlreadyExist(): boolean {
    let holidaysTimes = [];
    this.holidays.forEach(holiday => {
      holidaysTimes.push(...this.getAllDateTimes(holiday));
    });

    let newHolidayTimes = this.getAllDateTimes(new Holiday(this.startDate, this.endDate));
    
    const result = holidaysTimes.some(h => newHolidayTimes.includes(h));
    return result;
  }

  private getAllDateTimes(holiday: Holiday): number[] {
    let times = [];
    let currentDate = new Date(holiday.startDate);
    while (true) {
      times.push(currentDate.getTime());
      if (currentDate.getTime() == holiday.endDate.getTime()) break;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return times;
  }
}
