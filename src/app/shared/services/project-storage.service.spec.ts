import {TestBed} from '@angular/core/testing';

import {ProjectStorageService} from './project-storage.service';
import {Project} from "../entities/Project";
import {History} from "../entities/History";

describe('ProjectStorageService', () => {
  let service: ProjectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide projects from local storage in good order with history', () => {
    localStorage.setItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify([
      {
        name: 'amazing',
        clientName: 'Google',
        history: [
          {
            from: new Date(2020,3, 16, 11, 10),
            to: new Date(2020,3, 16, 11, 45)
          },{
            from: new Date(2020,3, 17, 9),
            to: new Date(2020,3, 17, 12)
          },
        ]
      },
      {
        name: 'awesome',
        clientName: 'Amazon',
        history: [
          {
            from: new Date(2020,3, 16, 14, 2),
            to: new Date(2020,3, 16, 18, 45)
          },{
            from: new Date(2020,3, 17, 14),
            to: new Date(2020,3, 17, 18)
          },
        ]
      }
    ]));
    service = new ProjectStorageService();
    const projects = service.getProjects();
    expect(projects[0].name).toEqual('awesome');
    expect(projects[0].clientName).toEqual('Amazon');

  });

  it('should provide projects from local storage in good order when no history', () => {
    localStorage.setItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify([
      {
        name: 'amazing',
        clientName: 'Google',
        createdAt: new Date(2020,3, 15)
      },
      {
        name: 'awesome',
        clientName: 'Amazon',
        createdAt: new Date(2020,3, 16)
      }
    ]));
    service = new ProjectStorageService();
    const projects = service.getProjects();
    expect(projects[0].name).toEqual('awesome');
    expect(projects[0].clientName).toEqual('Amazon');

  });

  it('should provide projects from local storage in good order when some have no history', () => {
    localStorage.setItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify([
      {
        name: 'amazing',
        clientName: 'Google',
        createdAt: new Date(2020,3, 16),
      },
      {
        name: 'awesome',
        clientName: 'Amazon',
        createdAt: new Date(2020,3, 15),
        history: [
          {
            from: new Date(2020,3, 17, 14),
            to: new Date(2020,3, 17, 18)
          }
        ]
      }
    ]));
    service = new ProjectStorageService();
    const projects = service.getProjects();
    expect(projects[0].name).toEqual('awesome');
    expect(projects[0].clientName).toEqual('Amazon');

  });

  it('should save a project in localstorage', () => {
    const project = new Project('incredible', 'Facebook');
    project.history.push(new History(
      new Date(2020, 3, 17, 17),
      new Date(2020, 3, 17, 17,30)
    ))
    service.saveProject(project);

    const rawProjects = JSON.parse(localStorage.getItem(ProjectStorageService.LOCAL_STORAGE_PROJECTS_KEY));
    expect(rawProjects[0]).toEqual(jasmine.objectContaining({
      name:"incredible",
      clientName: "Facebook",
      history:[
        {
          from: new Date(2020, 3,17, 17).toISOString(),
          to: new Date(2020, 3, 17, 17, 30).toISOString()
        }
      ]}))
  })
});
