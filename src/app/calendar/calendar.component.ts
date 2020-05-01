import {Component, EventEmitter, OnInit} from '@angular/core';
import {CalendarEvent} from "calendar-utils";
import {ProjectStorageService} from "../shared/services/project-storage.service";
import {BeautifulSecondsPipe} from "../shared/pipes/beautiful-seconds.pipe";
import {CalendarView} from "angular-calendar";
import {format} from "date-fns";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(private projectStorageService: ProjectStorageService, private beautifulSecondsPipe: BeautifulSecondsPipe) { }

  ngOnInit(): void {
    const projects = this.projectStorageService.getProjects();
    for(const project of projects){
      console.log(project)
      const timePerDay = {};
      for(const history of project.history){
        const date = format(history.from, 'P');
        const duration = Math.round((history.to.getTime() - history.from.getTime()) / 1000);
        timePerDay[date] = typeof timePerDay[date] === 'number' ? timePerDay[date] + duration : duration;
      }
      for(const date of Object.keys(timePerDay)){
        const event = {
          title: `${project.clientName} - ${project.name}`,
          start: new Date(date),
          project: project,
          totalDuration: this.beautifulSecondsPipe.transform(timePerDay[date])
        };
        this.events.push(event)
      }
    }

  }

}
