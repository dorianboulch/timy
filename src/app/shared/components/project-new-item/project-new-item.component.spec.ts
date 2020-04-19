import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNewItemComponent } from './project-new-item.component';
import { FormsModule } from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe('ProjectNewItemComponent', () => {
  let component: ProjectNewItemComponent;
  let fixture: ComponentFixture<ProjectNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNewItemComponent ],
      imports: [ FormsModule, TranslateModule.forRoot(), FontAwesomeTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
