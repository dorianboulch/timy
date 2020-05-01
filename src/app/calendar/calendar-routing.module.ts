import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from "./calendar.component";

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
