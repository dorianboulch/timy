import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectItemComponent} from './project-item.component';
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {SharedModule} from "../../shared.module";

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectItemComponent ],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule, SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
