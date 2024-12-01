import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStopwatchComponent } from './task-stopwatch.component';

describe('TaskStopwatchComponent', () => {
  let component: TaskStopwatchComponent;
  let fixture: ComponentFixture<TaskStopwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskStopwatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStopwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
