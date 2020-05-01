import {Injectable} from '@angular/core';
import {Project} from "../entities/Project";
import {ProjectStorageService} from "./project-storage.service";
import {History} from "../entities/History";
import {BehaviorSubject} from "rxjs";
import {differenceInSeconds, endOfDay, isThisWeek, isToday} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class ProjectTimeManagerService {

  public activeProject: Project = null;

  public totalTimeTodayCounter = 0;
  public totalTimeThisWeekCounter = 0;

  public totalTimeToday: BehaviorSubject<number>;
  public totalTimeThisWeek: BehaviorSubject<number>;
  public counting: BehaviorSubject<boolean>;

  constructor(private projectStorageService: ProjectStorageService) {

    this.totalTimeTodayCounter = this.getTotalTimeTodayFromProjects();
    this.totalTimeThisWeekCounter = this.getTotalTimeThisWeekFromProjects();

    this.totalTimeToday = new BehaviorSubject<number>(this.totalTimeTodayCounter);
    this.totalTimeThisWeek = new BehaviorSubject<number>(this.totalTimeThisWeekCounter);
    this.counting = new BehaviorSubject<boolean>(false);

    setInterval(() => {this.tick()}, 1000);
  }

  public getTotalTimeTodayFromProjects(): number {
    return Object.assign([], this.projectStorageService.getProjects()).reduce((seconds, project) => {
      return seconds + project.history.filter(history => {
        return isToday(history.from)
      }).reduce((total, history) => {
        return total + differenceInSeconds(history.to, history.from);
      }, 0);
    }, 0);
  }

  public getTotalTimeThisWeekFromProjects(): number {
    return Object.assign([], this.projectStorageService.getProjects()).reduce((seconds, project) => {
      return seconds + project.history.filter(history => {
        return isThisWeek(history.from, {weekStartsOn: 1});
      }).reduce((total, history) => {
        return total + differenceInSeconds(history.to, history.from);
      }, 0);
    }, 0);
  }

  public startTimeCounting(project: Project): void {
    this.activeProject = project;

    const history = new History(new Date(), new Date());
    this.activeProject.history.push(history);
    this.projectStorageService.saveProject(this.activeProject);
    this.counting.next(true);
  }

  public stopTimeCounting(): void {
    this.activeProject = null;
    this.counting.next(false);
  }

  public getTotalTimeToday(): BehaviorSubject<number>{
    return this.totalTimeToday;
  }

  public isCounting(): BehaviorSubject<boolean>{
    return this.counting;
  }

  private tick(): void {
    if (this.activeProject != null) {
      const lastHistory = this.activeProject.getLastHistory();
      const now = new Date();
      if(isToday(lastHistory.from)){
        lastHistory.to = now;
        this.activeProject.timeSpentToday++;
      }else{
        lastHistory.to = endOfDay(lastHistory.from);
        this.activeProject.timeSpentToday = 0;
        this.activeProject.history.push(new History(new Date(), new Date()));
      }

      this.projectStorageService.saveProject(this.activeProject);

      this.totalTimeTodayCounter++;
      this.totalTimeToday.next(this.totalTimeTodayCounter);

      this.totalTimeThisWeekCounter++;
      this.totalTimeThisWeek.next(this.totalTimeThisWeekCounter);
    }
  }

}
