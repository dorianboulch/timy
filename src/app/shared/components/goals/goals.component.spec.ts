import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoalsComponent} from './goals.component';
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe('GoalsComponent', () => {
  let component: GoalsComponent;
  let fixture: ComponentFixture<GoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsComponent ],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert time to seconds', () => {
    expect(component.timeToSeconds('01:00')).toEqual(3600);
    expect(component.timeToSeconds('01:32')).toEqual(5520);
    expect(component.timeToSeconds('00:02')).toEqual(120);
  });

  it('should convert seconds to time', () => {
    expect(component.secondsToTime(3600)).toEqual('01:00');
    expect(component.secondsToTime(5520)).toEqual('01:32');
    expect(component.secondsToTime(120)).toEqual('00:02');
  });

});
