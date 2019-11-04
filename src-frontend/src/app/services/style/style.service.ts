import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
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

  private chageUserStyles(user: User, isAdding: boolean): void {
    for(let i = 0; i < user.holidays.length; i++) {
      const currentDate = new Date(user.holidays[i].startDate);
      const endDate = user.holidays[i].endDate;

      while (true) {
        var elem = document.getElementById(this.convertDateToDateId(currentDate));
        if (isAdding) {
          elem.classList.add(`user-${user.id}`);
        } else {
          elem.classList.remove(`user-${user.id}`);
        }

        if (currentDate.getTime() == endDate.getTime()) break;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // for(let k = 0; k < daysArr.length; k++) {
      //   var elem = document.getElementById(`date-${user.holidays[k].month}-${daysArr[k]}`);

      //   if (isAdding) {
      //     elem.classList.add(`user-${user.id}`);
      //     if (k == 0) elem.classList.add('first-vacation-day');
      //     if (k == (daysArr.length - 1)) elem.classList.add('last-vacation-day');
      //   } else {
      //     elem.classList.remove(`user-${user.id}`);
      //     if (k == 0) elem.classList.remove('first-vacation-day');
      //     if (k == (daysArr.length - 1)) elem.classList.remove('last-vacation-day');
      //   }
      // }
    }
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