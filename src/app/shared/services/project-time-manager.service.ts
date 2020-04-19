import {Injectable} from '@angular/core';
import {Project} from "../entities/Project";
import {ProjectStorageService} from "./project-storage.service";
import {History} from "../entities/History";

@Injectable({
  providedIn: 'root'
})
export class ProjectTimeManagerService {

  public activeProject: Project = null;
  public totalTimeToday = 0;

  constructor(private projectStorageService: ProjectStorageService) {
    const now = new Date();

    this.totalTimeToday = Object.assign([], this.projectStorageService.getProjects()).reduce((seconds, project) => {
      return seconds + project.history.filter(history => {
        return now.getFullYear() === history.from.getFullYear() && now.getMonth() === history.from.getMonth() && now.getDate() === history.from.getDate()
      }).reduce((total, history) => {
        return total + Math.round((history.to.getTime() - history.from.getTime()) / 1000)
      }, 0);
    }, 0)

    setInterval(() => {this.tick()}, 1000);
  }

  public startTimeCounting(project: Project): void {
    this.activeProject = project;

    const history = new History(new Date(), new Date());
    this.activeProject.history.push(history)
  }

  public stopTimeCounting(): void {
    this.activeProject = null;
  }

  private tick(): void {
    if (this.activeProject != null) {
      const lastHistory = this.activeProject.getLastHistory();
      lastHistory.to = new Date();
      this.projectStorageService.saveProject(this.activeProject);
      this.totalTimeToday++;
    }
  }

}
