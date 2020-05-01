import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectListComponent} from './project-list.component';
import {ProjectNewItemComponent} from "../project-new-item/project-new-item.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, ProjectNewItemComponent ],
      imports: [ FormsModule, TranslateModule.forRoot(), FontAwesomeTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
