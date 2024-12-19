import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
    return this.httpClient.get<ITaskType[]>(this.baseUrl + 'taskTypes');
  }

  getTasks(taskTypeId: number, selectedDate: string): Observable<ITask[]> {
    const options = {
      params: new HttpParams()
        .set('taskTypeId', 1)
        .set('selectedDate', selectedDate)
    };
    return this.httpClient.get<any>(this.baseUrl + `tasks`, options);
  }

  addTask(name: string, taskTypeId: number, startDateTime: Date, endDateTime: Date): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'tasks', {name: name, taskTypeId: taskTypeId,
      startDateTime: startDateTime.toISOString(), endDateTime: endDateTime.toISOString()});
  }

  updateTask(id: number, name: string, taskTypeId: number, editedStartDateTime: Date,
             editedEndDateTime: Date): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'tasks', {taskId: id, taskTypeId: taskTypeId, name: name,
      startDateTime: editedStartDateTime.toISOString(),
      endDateTime: editedEndDateTime.toISOString()});
  }

  deleteTask(id: string) {
    return this.httpClient.request('delete', this.baseUrl + `tasks/${id}`);
  }
}
