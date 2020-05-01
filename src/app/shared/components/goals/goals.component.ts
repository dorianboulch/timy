import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoalsService} from "../../services/goals.service";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ProjectTimeManagerService} from "../../services/project-time-manager.service";

@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, OnDestroy {

  private subscribeList = [];
  public dayProgress: number;
  public weekProgress: number;
  public weekSecondsGoal: number;
  public daySecondsGoal: number;

  public dailyGoalInputValue: string;
  public weeklyGoalInputValue: string;

  public editingDailyGoal: boolean;
  public editingWeeklyGoal: boolean;
  faCheck = faCheck;
  faTimes = faTimes;


  constructor(private goalsService: GoalsService, public projectTimeManagerService: ProjectTimeManagerService) { }

  ngOnInit(): void {
    this.daySecondsGoal = this.goalsService.getDaySecondsGoal();
    this.weekSecondsGoal = this.goalsService.getWeekSecondsGoal();

    this.dailyGoalInputValue = this.secondsToTime(this.daySecondsGoal);
    this.weeklyGoalInputValue = this.secondsToTime(this.weekSecondsGoal);

    this.subscribeList.push(
      this.goalsService.dayProgress.subscribe((next) => {
        this.dayProgress = next;
      })
    );
    this.subscribeList.push(
      this.goalsService.weekProgress.subscribe((next) => {
        this.weekProgress = next;
      })
    );
  }

  ngOnDestroy(): void {
    for(const s of this.subscribeList){
      s.unsubscribe();
    }
  }


  editDailyGoal($event: MouseEvent): void {
    $event.preventDefault();
    if(this.editingDailyGoal){
      this.editingDailyGoal = false;
      this.dailyGoalInputValue = this.secondsToTime(this.daySecondsGoal);
    }else{
      this.editingDailyGoal = true;
    }
  }

  editWeeklyGoal($event: MouseEvent): void {
    $event.preventDefault();
    this.editingWeeklyGoal = !this.editingWeeklyGoal;
  }

  dailyGoalIsEnabled(): boolean{
    return this.daySecondsGoal > -1
  }

  weeklyGoalIsEnabled(): boolean{
    return this.weekSecondsGoal > -1
  }

  saveNewDailyGoal(): void {
    if(this.dailyGoalInputValue && this.dailyGoalInputValue != '' && this.dailyGoalInputValue != '00:00'){
      this.daySecondsGoal = this.timeToSeconds(this.dailyGoalInputValue);
    }else{
      this.daySecondsGoal = -1;
    }
    this.goalsService.setDaySecondsGoal(this.daySecondsGoal);
    this.editingDailyGoal = false;
  }

  saveNewWeeklyGoal(): void {
    if(this.weeklyGoalInputValue && this.weeklyGoalInputValue != '' && this.weeklyGoalInputValue != '00:00'){
      this.weekSecondsGoal = this.timeToSeconds(this.weeklyGoalInputValue);
    }else{
      this.weekSecondsGoal = -1;
    }
    this.goalsService.setWeekSecondsGoal(this.weekSecondsGoal);
    this.editingWeeklyGoal = false;
  }

  /**
   * @param time in format hh:mm
   */
  timeToSeconds(time: string): number{
    const timeParts = time.split(':');
    return (parseInt(timeParts[0]) * 3600) + (parseInt(timeParts[1]) * 60)
  }

  secondsToTime(seconds: number): string{
    let minutes = Math.trunc(seconds / 60);
    const hours = Math.trunc(minutes / 60);
    minutes = minutes - (hours * 60);
    const minutesStr = GoalsComponent.pad(minutes, 2);
    const hoursStr = GoalsComponent.pad(hours, 2);
    return `${hoursStr}:${minutesStr}`
  }


  private static pad(number, length): string {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
