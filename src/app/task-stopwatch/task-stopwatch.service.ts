import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITaskType} from "../../models/task-stopwatch/tasktype.model";
import { ITask } from "../../models/task-stopwatch/task.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskStopwatchService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getTaskTypes(): Observable<ITaskType[]> {
    return this.httpClient.get<ITaskType[]>(this.baseUrl + 'tasktype');
  }

  getTasks(selectedDate: string, taskTypeId: number): Observable<ITask[]> {
    const options = {
      params: new HttpParams().set('selectedDate', selectedDate).set('taskTypeId', taskTypeId)
    };
    return this.httpClient.get<any>(this.baseUrl + 'taskstopwatch', options);
  }

  addTask(name: string, displayHour: number, displayMinute: number, displaySecond: number,
          startTime: string, taskTypeId: number): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('name', name)
        .set('elapsedHour', displayHour)
        .set('elapsedMinute', displayMinute)
        .set('elapsedSecond', displaySecond)
        .set('startTime', startTime)
        .set('taskTypeId', taskTypeId)
    };
    return this.httpClient.post(this.baseUrl + 'taskstopwatch', {}, options);
  }

  updateTask(id: number, name: string, editedStartDate: string, startHours: number, startMinutes: number, startSeconds: number, startPeriod: string, editedEndDate: string,
  endHours: number, endMinutes: number, endSeconds: number, endPeriod: string, taskTypeId: number): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('id', id)
        .set('name', name)
        .set('startDate', editedStartDate)
        .set('startHours', startHours)
        .set('startMinutes', startMinutes)
        .set('startSeconds', startSeconds)
        .set('startPeriod', startPeriod)
        .set('endDate', editedEndDate)
        .set('endHours', endHours)
        .set('endMinutes', endMinutes)
        .set('endSeconds', endSeconds)
        .set('endPeriod', endPeriod)
        .set('taskTypeId', taskTypeId)
    };
    return this.httpClient.put(this.baseUrl + 'taskstopwatch', {}, options);
  }

  deleteTask(id: string) {
    const options = {
      params: new HttpParams()
        .set('id', id)
    }
    return this.httpClient.request('delete', this.baseUrl + 'taskstopwatch', options);
  }
}
