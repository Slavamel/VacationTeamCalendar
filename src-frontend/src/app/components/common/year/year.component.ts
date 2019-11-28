import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  animations: [
    trigger('positionState', [
      state('normal', style({
        transform: 'translateX(0)'
      })),
      state('left', style({
        transform: 'translateX(-40px)'
      })),
      state('right', style({
        transform: 'translateX(30px)'
      })),
      transition('* <=> *', animate(500))
    ]),
    trigger('fontSize', [
      state('big', style({
        fontSize: '22px',
        fontWeight: '500'
      })),
      state('small', style({
        fontSize: '12px'
      })),
      transition('* <=> *', animate(500))
    ])
  ]
})
export class YearComponent implements OnInit {
  @Output() currentYearChange = new EventEmitter<number>();
  @Input() currentYear: number;

  state = 'normal';
  years: number[];
  currentYearIndex = 1;

  constructor() { }

  ngOnInit() {
    this.initYears();
  }

  onYearClicked(index: number) {
    switch (index) {
      case 0:
        this.state = 'right';
        break;
      case 1:
        this.state = 'normal';
        break;
      case 2:
        this.state = 'left';
        break;
    }
    this.currentYearIndex = index;
    this.currentYearChange.emit(this.years[index]);
  }

  private initYears(): void {
    this.years = [this.currentYear - 1, this.currentYear, this.currentYear + 1];
  }
}
