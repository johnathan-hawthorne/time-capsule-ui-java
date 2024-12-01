import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {ITaskSchedule} from "../../models/task-scheduler/taskschedule.model";
import { TaskSchedulerService } from './task-scheduler.service';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {
  names: string[] = [];
  selectedDate: string;
  schedule: ITaskSchedule;
  constructor(private taskScheduleService: TaskSchedulerService) {
    this.selectedDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    this.schedule = new ITaskSchedule("", new Date(), []);
  }

  ngOnInit(): void {
    this.getSchedule();
  }

  reset(): void {
    if (typeof this.names !== 'undefined') {
      for (var i = 0; i < 15; i++) {
        this.names[i] = "";
      }
    }
  };

  openAddDialog(): void {
    this.reset();
  };

  openEditDialog(): void {
    this.reset();
    if (this.schedule.timeSlots.length > 0) {
      for (let i = 0; i < this.schedule.timeSlots.length; i++) {
        this.names[i] = this.schedule.timeSlots[i].taskName;
      }
    }
  }

  addSchedule(): void {
    this.taskScheduleService.addSchedule(this.selectedDate, this.names)
      .subscribe(() => {
        this.getSchedule();
        // console.log("Failed to add schedule.")
      })
  };

  updateSchedule(): void {
    this.taskScheduleService.updateSchedule(this.selectedDate, this.names)
      .subscribe(() => {
        this.getSchedule();
      })
  }

  getSchedule(): void {
    this.taskScheduleService.getSchedule(this.selectedDate)
      .subscribe(response => {
        this.schedule = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < this.schedule.timeSlots.length; i++) {
          this.names[i] = this.schedule.timeSlots[i].taskName;
        }
      })
  };
}
