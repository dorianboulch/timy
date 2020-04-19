import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../entities/Project";
import {ProjectTimeManagerService} from "../../services/project-time-manager.service";
import {ProjectStorageService} from "../../services/project-storage.service";
import {faPlay, faStop, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  public project: Project = new Project();

  public optionsDisplayed = false;
  public editingName = false;
  public editingClientName = false;
  public faPlay = faPlay;
  public faStop = faStop;
  public faTrash = faTrash;

  constructor(private projectTimeManagerService: ProjectTimeManagerService, private projectStorageService: ProjectStorageService) { }

  ngOnInit(): void {
  }

  isActive(): boolean{
    return this.project === this.projectTimeManagerService.activeProject
  }

  startCounting(): void {
    this.projectTimeManagerService.stopTimeCounting();
    this.projectTimeManagerService.startTimeCounting(this.project);
  }

  stopCounting(): void {
    this.projectTimeManagerService.stopTimeCounting();
  }

  getTimeSpentToday(): number {
    if(this.project.history == null || this.project.history.length < 1){
      return 0
    }

    const now = new Date();
    return this.project.history.filter(history => {
        return now.getFullYear() === history.from.getFullYear() && now.getMonth() === history.from.getMonth() && now.getDate() === history.from.getDate()
    }).reduce((total,history) => {
      return total + Math.round((history.to.getTime() - history.from.getTime()) / 1000)
    }, 0);
  }

  displayOptions(): void {
    if(!this.isActive()){
      this.optionsDisplayed = !this.optionsDisplayed
    }
  }

  deleteProject(): void {
    this.projectStorageService.deleteProject(this.project);
  }

  editName(): void {
    this.editingName = true;
  }

  stopEditName(): void {
    this.editingName = false;
    this.projectStorageService.saveProject(this.project);
  }

  keypressEditName($event: KeyboardEvent): void {
    if($event.key === 'Enter'){
      this.stopEditName();
    }
  }

  editClientName(): void {
    this.editingClientName = true;
  }

  stopEditClientName(): void {
    this.editingClientName = false;
    this.projectStorageService.saveProject(this.project);
  }

  keypressEditClientName($event: KeyboardEvent): void {
    if($event.key === 'Enter'){
      this.stopEditClientName();
    }
  }
}
