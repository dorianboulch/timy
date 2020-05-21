import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import {BeautifulSecondsPipe} from "../shared/pipes/beautiful-seconds.pipe";
import {CalendarCommonModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {ProjectStorageService} from "../shared/services/project-storage.service";
import {Project} from "../shared/entities/Project";
import {History} from "../shared/entities/History";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let projectStorageService: ProjectStorageService;
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
    projectStorageService = TestBed.inject(ProjectStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create events from projects', () => {
    const project1 = new Project('p1', 'c1');
    project1.history.push(new History(new Date(2020, 3, 27, 9),  new Date(2020, 3, 27, 12)));
    project1.history.push(new History(new Date(2020, 3, 27, 14), new Date(2020, 3, 27, 18)));
    project1.history.push(new History(new Date(2020, 3, 28, 9),  new Date(2020, 3, 28, 12)));
    project1.history.push(new History(new Date(2020, 3, 28, 22), new Date(2020, 3, 28, 23, 59)));

    const project2 = new Project('p2', 'c2');
    project2.history.push(new History(new Date(2020, 3, 28, 14),  new Date(2020, 3, 28, 17)));

    spyOn(projectStorageService, 'getProjects').and.returnValue([project1, project2]);

    component.createEventsFromProjects();

    expect(component.events.length).toBe(3);
    expect(component.events[0]['totalDuration']).toBe('07:00:00');
    expect(component.events[0].start.toISOString()).toBe('2020-04-27T00:00:00.000Z');
    expect(component.events[1]['totalDuration']).toBe('04:59:00');
    expect(component.events[1].start.toISOString()).toBe('2020-04-28T00:00:00.000Z');
    expect(component.events[2]['totalDuration']).toBe('03:00:00');
    expect(component.events[2].start.toISOString()).toBe('2020-04-28T00:00:00.000Z');
  });
});
