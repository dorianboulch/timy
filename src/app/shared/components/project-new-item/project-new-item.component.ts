import { Component, OnInit } from '@angular/core';
import {Project} from "../../entities/Project";
import {ProjectStorageService} from "../../services/project-storage.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-project-new-item',
  templateUrl: './project-new-item.component.html',
  styleUrls: ['./project-new-item.component.scss']
})
export class ProjectNewItemComponent implements OnInit {

  public project: Project = new Project();
  public faPlus = faPlus;


  constructor(private projectStorageService: ProjectStorageService) { }

  ngOnInit(): void {

  }

  createProject(): void {
    if(this.project.name && this.project.name !== ''){
      if(!this.project.clientName || this.project.clientName === ''){
        this.project.clientName = '-'
      }
      this.project.createdAt = new Date();
      this.projectStorageService.saveProject(this.project);
      this.project = new Project();
    }
  }

  keypressField($event: KeyboardEvent): void {
    if($event.key === 'Enter'){
      this.createProject()
    }
  }
}
