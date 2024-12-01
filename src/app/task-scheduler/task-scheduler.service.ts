import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { ITaskSchedule } from '../../models/task-scheduler/taskschedule.model';

@Injectable({
  providedIn: 'root'
})
export class TaskSchedulerService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getSchedule(selectedDate: string): Observable<ITaskSchedule> {
    const options = {
      params: new HttpParams().set('selectedDate', selectedDate)
    };

    return this.httpClient.get<ITaskSchedule>(this.baseUrl + 'taskscheduler', options);
  }

  updateSchedule(selectedDate: string, names: string[]): Observable<object> {
    const options = {
      params: new HttpParams()
        .set('selectedDate', selectedDate)
        .set('taskTypeId', 1)
    };

    return this.httpClient.put(this.baseUrl + 'taskscheduler', names, options);
  }

  addSchedule(selectedDate: string, names: string[]): Observable<object> {
    const options = {
      params: new HttpParams()
        .set('selectedDate', selectedDate)
        .set('taskTypeId', 1)
    };

    return this.httpClient.post(this.baseUrl + 'taskscheduler', names, options);
  }
}
