import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Holiday } from 'src/app/models/holiday.model';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private holidayClass = "holiday";
  private holidayHighlightedClass = "holiday--highlighted";

  setUsersStyles(users: User[]): void {
    this.addGlobalCalsses(users);
    for(let i = 0; i < users.length; i++) {
      this.addUserStyles(users[i]);
    }
  }

  removeUserStyles(user: User): void {
    this.chageUserStyles(user, false);
  }

  addUserStyles(user: User): void {
    this.chageUserStyles(user, true);
  }

  setHolidaysStyles(holidays: Holiday[], isHolidaysHighlighted: boolean = false): void {
    for(let i = 0; i < holidays.length; i++) {
      const currentDate = new Date(holidays[i].startDate);
      const endDate = new Date(holidays[i].endDate);

      while (true) {
        let elem = document.getElementById(this.convertDateToDateId(currentDate));
        if (isHolidaysHighlighted) {
          elem.classList.add(this.holidayHighlightedClass);
        } else {
          elem.classList.add(this.holidayClass);
        }

        if (currentDate.getTime() == endDate.getTime()) break;
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  changeHolidayHighlightedClass(holiday: Holiday, isAdding: boolean): void {
    this.addOrRemoveClass(holiday, isAdding, this.holidayHighlightedClass);
  }

  private addOrRemoveClass(holiday: Holiday, isAdding: boolean, className: string): void {
    const currentDate = new Date(holiday.startDate);
    const endDate = new Date(holiday.endDate);

    while (true) {
      let elem = document.getElementById(this.convertDateToDateId(currentDate));
      if (isAdding) {
        elem.classList.add(className);
      } else {
        elem.classList.remove(className);
      }

      if (currentDate.getTime() == endDate.getTime()) break;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private chageUserStyles(user: User, isAdding: boolean): void {
    user.holidays.forEach(holiday => {
      this.addOrRemoveClass(holiday, isAdding, `user-${user.id}`);
    });
  }

  private convertDateToDateId(date: Date): string {
    const dateId = `date-${date.getMonth()+1}-${date.getDate()}`;
    return dateId;
  }

  private addGlobalCalsses(users: User[]): void {
    let style = document.createElement('style');
    for(let i = 0; i < users.length; i++) {
      style.innerHTML += `.user-${users[i].id} { background-color: ${users[i].color}; }\n`

      for(let k =0; k < users.length; k++) {
        if (k == i) { continue; }
        style.innerHTML += `.user-${users[i].id}.user-${users[k].id} { 
          background: repeating-linear-gradient(0deg, ${users[i].color}, ${users[i].color} 5px, ${users[k].color} 5px, ${users[k].color} 10px); 
          border-radius: 0;
        }\n`;
      }
    }
    document.head.appendChild(style);
  }
}