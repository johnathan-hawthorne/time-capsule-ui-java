import { TestBed } from '@angular/core/testing';

import { TaskStopwatchService } from './task-stopwatch.service';

describe('TaskStopwatchService', () => {
  let service: TaskStopwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStopwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
