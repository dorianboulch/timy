import { Component, OnInit } from '@angular/core';
import {Project} from "../../entities/Project";
import {ProjectStorageService} from "../../services/project-storage.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public projects: Project[];
  constructor(private projectStorageService: ProjectStorageService) { }

  ngOnInit(): void {
    this.projects = this.projectStorageService.getProjects();
  }

}
