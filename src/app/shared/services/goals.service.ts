import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectTimeManagerService} from "./project-time-manager.service";

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private static readonly GOALS_KEY = 'goals';

  private weekSecondsGoal = -1;
  private daySecondsGoal = -1;

  public weekProgress: BehaviorSubject<number>;
  public dayProgress: BehaviorSubject<number>;

  constructor(private projectTimeManagerService: ProjectTimeManagerService) {
    const rawData = localStorage.getItem(GoalsService.GOALS_KEY);
    if(rawData){
      const goals = JSON.parse(rawData);
      this.weekSecondsGoal = goals.weekSeconds;
      this.daySecondsGoal = goals.daySeconds;
    }

    this.dayProgress = new BehaviorSubject<number>(0);
    this.projectTimeManagerService.totalTimeToday.subscribe((next) => {
      if(this.daySecondsGoal > 0){
        this.dayProgress.next(next / this.daySecondsGoal);
      }
    });

    this.weekProgress = new BehaviorSubject<number>(0);
    this.projectTimeManagerService.totalTimeThisWeek.subscribe((next) => {
      if(this.daySecondsGoal > 0){
        this.weekProgress.next(next / this.weekSecondsGoal);
      }
    });
  }

  getWeekSecondsGoal(): number{
    return this.weekSecondsGoal;
  }

  getDaySecondsGoal(): number{
    return this.daySecondsGoal;
  }

  setWeekSecondsGoal(goal: number): void{
    this.weekSecondsGoal = goal;
    this.weekProgress.next(this.projectTimeManagerService.totalTimeThisWeekCounter / this.weekSecondsGoal);
    this.saveGoals();
  }

  setDaySecondsGoal(goal: number): void{
    this.daySecondsGoal = goal;
    this.dayProgress.next(this.projectTimeManagerService.totalTimeTodayCounter / this.daySecondsGoal);
    this.saveGoals();
  }

  saveGoals(): void{
    localStorage.setItem(GoalsService.GOALS_KEY, JSON.stringify({
      weekSeconds: this.weekSecondsGoal,
      daySeconds: this.daySecondsGoal,
    }));
  }
}
