import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import {BeautifulSecondsPipe} from "../shared/pipes/beautiful-seconds.pipe";
import {CalendarCommonModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [
        CalendarCommonModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
        CalendarMonthModule
      ],
      providers: [ BeautifulSecondsPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
