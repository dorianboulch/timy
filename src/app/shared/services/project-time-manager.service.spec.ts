import { TestBed } from '@angular/core/testing';

import { ProjectTimeManagerService } from './project-time-manager.service';

describe('ProjectTimeManagerService', () => {
  let service: ProjectTimeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTimeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
