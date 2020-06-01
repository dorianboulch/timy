import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectTimeManagerService} from "../shared/services/project-time-manager.service";
import {faCalendarAlt, faCog} from "@fortawesome/free-solid-svg-icons";
import {ElectronService} from "../core/services";
import {BehaviorSubject} from "rxjs";
import {GoalsService} from "../shared/services/goals.service";
import BrowserWindow = Electron.BrowserWindow;
import * as os from "os";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public faCalendarAlt = faCalendarAlt;
  public faCog = faCog;
  public totalTimeTodayCounter = 0;
  public displayGoals = false;

  private dayProgress: number;
  private currentWindow: BrowserWindow;
  private timeCounting: BehaviorSubject<boolean>;
  private totalTimeToday: BehaviorSubject<number>;

  constructor(private projectTimeManagerService: ProjectTimeManagerService,
              private goalsService: GoalsService,
              private electronService: ElectronService) { }

  ngOnInit(): void {
    this.currentWindow = this.electronService.remote.getCurrentWindow()

    this.goalsService.dayProgress.subscribe((progress) => {
      this.dayProgress = progress;
      this.currentWindow.setProgressBar(this.dayProgress < 1 ? this.dayProgress : 1);
    })

    this.totalTimeToday = this.projectTimeManagerService.getTotalTimeToday();
    this.totalTimeToday.subscribe((next) => {
      this.totalTimeTodayCounter = next;
    })

    this.timeCounting = this.projectTimeManagerService.isCounting();
    this.timeCounting.subscribe((isCounting) => {
      if(isCounting){
        this.currentWindow.setProgressBar(this.dayProgress);
      }else{
        if(this.dayProgress >= 1){
          this.currentWindow.setProgressBar(0, { mode: "none" })
        }else{
          this.currentWindow.setProgressBar(this.dayProgress, { mode: "paused" })
        }
      }
    })
  }

  toggleDisplayGoals(): void{
    this.displayGoals = ! this.displayGoals
  }

  ngOnDestroy(): void {
    this.totalTimeToday.unsubscribe();
    this.timeCounting.unsubscribe();
  }

  openCalendar(): void {
    const display = this.electronService.screen.getDisplayNearestPoint(this.electronService.screen.getCursorScreenPoint());
    const calendarWindowWidth = display.bounds.width - this.electronService.remote.getCurrentWindow().getBounds().width;
    const calendarWindowHeight = display.bounds.height;

    const calendarWindow = this.electronService.openNewWindow('calendar', {
      height: calendarWindowHeight,
      width: calendarWindowWidth,
      x: display.bounds.x,
      y: display.bounds.y
    });

    // fix windows window size
    if(os.platform() === 'win32'){
      calendarWindow.setBounds({
        x: display.bounds.x - 8,
        height: calendarWindowHeight+8,
        width: calendarWindowWidth+24,
      });
    }
  }

}
