import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarCommonModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {BeautifulSecondsPipe} from "../shared/pipes/beautiful-seconds.pipe";


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarCommonModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarMonthModule
  ],
  providers: [
    BeautifulSecondsPipe
  ]
})
export class CalendarModule { }
