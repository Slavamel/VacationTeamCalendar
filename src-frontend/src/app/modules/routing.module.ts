import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryHolidaysComponent } from '../components/country-holidays/country-holidays.component';
import { VacationComponent } from '../components/vacation/vacation.component';

const routes: Routes = [
  { path: '', redirectTo: '/vacation', pathMatch: 'full' },
  { path: 'vacation', component: VacationComponent },
  { path: 'country-holidays', component: CountryHolidaysComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }