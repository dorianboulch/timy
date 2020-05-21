import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../entities/Project";
import {ProjectTimeManagerService} from "../../services/project-time-manager.service";
import {ProjectStorageService} from "../../services/project-storage.service";
import {faCheck, faEdit, faPlay, faStop, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {History} from "../../entities/History";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  public project: Project = new Project();

  @ViewChild('editNameInput')
  public editNameInput: ElementRef;
  @ViewChild('editClientNameInput')
  public editClientNameInput: ElementRef;

  public optionsDisplayed = false;
  public detailsDisplayed = false;
  public editingName = false;
  public editingClientName = false;
  public editingHistory: History = null;

  public faPlay = faPlay;
  public faStop = faStop;
  public faTrash = faTrash;
  public faTimes = faTimes;
  public faEdit = faEdit;
  public faCheck = faCheck;

  public objectKeys = Object.keys;

  private backupEditingHistory: History = null;

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
    setTimeout(()=> {
      this.editNameInput.nativeElement.focus();
    }, 0);
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
    setTimeout(()=> {
      this.editClientNameInput.nativeElement.focus();
    }, 0);
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

  toggleDetails(): void {
    this.detailsDisplayed = !this.detailsDisplayed;
  }

  deleteHistory(h: History): void {
    this.project.history.splice(this.project.history.indexOf(h), 1);
    this.projectStorageService.saveProject(this.project);
  }

  editHistory(h: History): void {
    if(this.editingHistory !== null){
      this.cancelEditingHistory(this.editingHistory);
    }

    this.editingHistory = h;
    this.backupEditingHistory = Object.assign(new History(h.from, h.to), h);
  }

  updateHistory(): void {
    this.projectStorageService.saveProject(this.project);
    this.stopEditingHistory();
  }

  cancelEditingHistory(h: History): void {
    h.from = this.backupEditingHistory.from;
    h.to = this.backupEditingHistory.to;
    this.backupEditingHistory = null;
    this.stopEditingHistory();
  }

  stopEditingHistory(): void {
    this.editingHistory = null;
  }

  editHistoryFrom(eventDate: string): void {
    this.editingHistory.from = eventDate ? new Date(eventDate) : null;
  }
  editHistoryTo(eventDate: string): void {
    this.editingHistory.to = eventDate ? new Date(eventDate) : null;
  }
}
