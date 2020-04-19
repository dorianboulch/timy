import { Injectable } from '@angular/core';
import {Project} from "../entities/Project";
import {History} from "../entities/History";

@Injectable({
  providedIn: 'root'
})
export class ProjectStorageService {

  public static readonly LOCAL_STORAGE_PROJECTS_KEY = 'projects';

  private projects = [];

  constructor() {
    this.restoreProjectsFromStorage();
    this.sortProjects();
  }

  getProjects(): Project[] {
    return this.projects;
  }

  saveProject(project: Project): void{
    let sortAfterSaving=true;

    const index = this.projects.findIndex(p => {
      return p.name === project.name
    });
    if(index > -1){
      this.projects[index] = project;
      if(index === 0){
        sortAfterSaving = false;
      }
    }else {
      this.projects.push(project);
    }
    this.saveProjects();

    if (sortAfterSaving) {
      this.sortProjects();
    }
  }

  deleteProject(project: Project): void {
    const index = this.projects.findIndex(p => {
      return p.name === project.name
    });
    if(index > -1){
      this.projects.splice(index, 1);
      this.saveProjects();
      this.sortProjects();
    }
  }

  private sortProjects(): void {
    this.projects.sort((a: Project, b: Project) => {
      const lastHistoryOfA = a.getLastHistory();
      const lastHistoryOfB = b.getLastHistory();

      //if no history
      if (lastHistoryOfA == null && lastHistoryOfB == null) {
        if (a.createdAt == b.createdAt) {
          return 0
        } else {
          if (a.createdAt > b.createdAt) {
            return -1
          } else {
            return 1
          }
        }
      }

      // if some one have history but other one no
      if (lastHistoryOfA == null) {
        if (a.createdAt == lastHistoryOfB.to) {
          return 0
        } else if (a.createdAt < lastHistoryOfB.to) {
          return 1
        } else {
          return -1
        }
      }
      if (lastHistoryOfB == null) {
        if (b.createdAt == lastHistoryOfA.to) {
          return 0
        } else if (b.createdAt < lastHistoryOfA.to) {
          return -1
        } else {
          return 1
        }
      }

      // else compare history
      if (lastHistoryOfA.to == lastHistoryOfB.to) {
        return 0
      }else if (lastHistoryOfA.to < lastHistoryOfB.to) {
        return 1
      } else{
        return -1
      }
    });
  }

  private saveProjects(): void{
    localStorage.setItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(this.projects));
  }

  private restoreProjectsFromStorage(): void {
    const localStorageDatas = localStorage.getItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY);

    if(!localStorageDatas){
      this.projects = [];
      return;
    }

    const rawProjects = JSON.parse(localStorageDatas);

    for(const rawProject of rawProjects){
      const project = new Project(rawProject.name, rawProject.clientName, new Date(rawProject.createdAt));
      project.history = []
      if(rawProject.history){
        for(const h of rawProject.history){
          project.history.push(new History(new Date(h.from), new Date(h.to)));
        }
      }
      this.projects.push(project)
    }
  }
}
