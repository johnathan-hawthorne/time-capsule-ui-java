import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import * as bootstrap from 'bootstrap';
import { ITask } from 'src/models/task-stopwatch/task.model';
import {ITaskType} from "../../models/task-stopwatch/tasktype.model";
import {TaskStopwatchService} from "./task-stopwatch.service";

@Component({
  selector: 'app-task-stopwatch',
  templateUrl: './task-stopwatch.component.html',
  styleUrls: ['./task-stopwatch.component.css']
})
export class TaskStopwatchComponent implements OnInit, AfterViewInit {
  baseUrl = "https://localhost:9191/";
  selectedTask: any;
  name: string;
  saveDisabled: boolean;
  stopDisabled: boolean;
  goDisabled: boolean;
  modalOpen: boolean;
  displayTaskType: boolean;
  currentStartTime: string;
  currentEndTime: string;
  editedStartDate: string;
  editedEndDate: string;
  startTime: any;
  endTime: any;
  editedStartTime: string;
  editedEndTime: string;
  selectedDate: string;
  worker: Worker | undefined;
  tasks: ITask[];
  taskTypes: ITaskType[];
  taskTypeId!: number;
  totalElapsedTime: string;
  modal: bootstrap.Modal | null;
  errorMessage: string;
  constructor(private taskStopwatchService: TaskStopwatchService) {
    this.name = '';
    this.saveDisabled = true;
    this.stopDisabled = true;
    this.goDisabled = false;
    this.modalOpen = false;
    this.displayTaskType = false;
    this.tasks = [];
    this.taskTypes = [];
    this.currentStartTime = '';
    this.currentEndTime = '';
    this.editedStartTime = '';
    this.editedStartDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    this.editedEndDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    this.editedEndTime = '';
    this.selectedDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    this.totalElapsedTime = '';
    this.modal = null;
    this.errorMessage = '';
  }

  ngAfterViewInit(): void { // hack p.135 - Angular Development with TypeScript
    const tt = document.getElementById("taskTypeId");
    if (tt) {
      tt.addEventListener("change", () => {
        this.getTasks();
      });
    }

    const sd = document.getElementById("selectedDate");
    if (sd) {
      sd.addEventListener("change", () => {
        this.getTasks();
      })
    }
  }

  ngOnInit(): void {
    this.getTaskTypes();
  }

  @HostListener('window:beforeunload')
  confirmClosingTabOrBrowser(): boolean {
    if (this.modalOpen) {
      if (!this.stopDisabled || !this.saveDisabled) {
        return false;
      }
    }
    return true;
  }

  openAddDialog(): void {
    this.modal = bootstrap.Modal.getInstance('#addModal');
    this.reset();
  }

  openUpdateDialog(data: ITask): void {
    this.modal = bootstrap.Modal.getInstance('#addModal');
    this.reset();
    this.selectedTask = { ...data }
    this.name = data.name;
    this.taskTypeId = data.taskTypeId;
    let splitStartTime = data.startDateTime.split(' ');
    this.currentStartTime = splitStartTime[0] + ' ' + splitStartTime[1];
    let splitEndTime = data.endDateTime.split(' ');
    this.currentEndTime = splitEndTime[0] + ' ' + splitEndTime[1];
    this.editedStartTime = "";
    this.editedEndTime = "";
    this.editedStartDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    this.editedEndDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
  }

  reset(): void {
    let minElement = document.getElementById("mins");
    let secondElement = document.getElementById("seconds");
    let hourElement = document.getElementById("currentHour");
    if (minElement && secondElement && hourElement) {
      minElement.innerText = "00";
      secondElement.innerText = "00";
      hourElement.innerText = "00";
    }
    this.name = "";
    this.saveDisabled = true;
    this.stopDisabled = true;
    this.goDisabled = false;
    this.modalOpen = true;
  }

  addTask(): void {
    this.modalOpen = false;
    this.modal = null;
    this.taskStopwatchService.addTask(this.name, this.taskTypeId, this.startTime, this.endTime)
      .subscribe(response => {
        //const modal = bootstrap.Modal.getInstance('addDialog'); // weird issue where modals won't load without this
        this.getTasks();
      });
  }

  updateTask(): void {
    if (this.editedStartTime != "" && this.editedEndTime != "") {
      this.modalOpen = false;
      let startDateTime = new Date();
      let splitStartDate = this.editedStartDate.split("-");
      startDateTime.setFullYear(parseInt(splitStartDate[0]), parseInt(splitStartDate[1]), 0);
      let splitStartTime = this.editedStartTime.split(":");
      startDateTime.setHours(parseInt(splitStartTime[0]));
      startDateTime.setMinutes(parseInt(splitStartTime[1][0] + splitStartTime[1][1]));
      startDateTime.setSeconds(0);
      let endDateTime = new Date();
      let splitEndDate = this.editedEndDate.split("-");
      endDateTime.setFullYear(parseInt(splitEndDate[0]), parseInt(splitEndDate[1]), 0);
      let splitEndTime = this.editedEndTime.split(":");
      endDateTime.setHours(parseInt(splitEndTime[0]));
      endDateTime.setMinutes(parseInt(splitEndTime[1][0] + splitEndTime[1][1]));
      endDateTime.setSeconds(0)
      this.taskStopwatchService.updateTask(this.selectedTask.id, this.name, this.taskTypeId, startDateTime,
        endDateTime)
        .subscribe(() => {
          this.getTasks();
        });
    } else {
      this.taskStopwatchService.updateTask(this.selectedTask.id, this.name, this.taskTypeId, new Date(this.editedStartDate),
        new Date(this.editedEndDate))
        .subscribe(() => {
          this.getTasks();
        });
    }
  }

  deleteTask(task: ITask): void {
    if (window.confirm(`Delete ${task.name}?`)) {
      this.taskStopwatchService.deleteTask(task.id)
        .subscribe(response => {
          this.getTasks();
        });
    }
  }

  stop(): void {
    if (this.worker) {
      this.worker.terminate();
      this.saveDisabled = false;
      this.stopDisabled = true;
      this.endTime = new Date();
    }
  }

  cancel(): void {
    if (!this.stopDisabled || !this.saveDisabled) {
      let closeModal = confirm("Changed you made may not be saved.");
      if (closeModal) {
        this.modal?.hide();
        this.modal = null;
        if (this.worker) {
          this.worker.terminate();
          this.modalOpen = false;
        }
      }
    } else {
      this.modal?.hide();
      this.modal = null;
      this.modalOpen = false;
    }
  }

  start(): void {
    if (window.Worker) {
      this.worker = new Worker(new URL('./../app.worker', import.meta.url));
      this.worker.postMessage('');
      this.worker.onmessage = function (e) {
        let minElement = document.getElementById("mins");
        let secondElement = document.getElementById("seconds");
        let hourElement = document.getElementById("currentHour");
        if (minElement && secondElement && hourElement) {
          hourElement.innerText = e.data[0];
          minElement.innerText = e.data[1];
          secondElement.innerText = e.data[2];
        }
      }
      this.startTime = new Date();
      this.saveDisabled = true;
      this.goDisabled = true;
      this.stopDisabled = false;
    }
  }

  getTasks(): void {
    this.taskStopwatchService.getTasks(this.taskTypeId)
      .subscribe(response => {
        this.displayTaskType = this.taskTypeId == 1;
        this.tasks = [...response];
        this.getTotalElapsedTime();
      },
        error => {
          this.errorMessage = `Failed to get tasks: ${error.status}`;
        });
  }

  getTaskTypes(): void {
    this.taskStopwatchService.getTaskTypes()
      .subscribe(response => {
        this.taskTypes = [...response];
        this.taskTypeId = this.taskTypes[0].id;

        this.getTasks();
      });
  }

  getTaskType(id: number): string {
    return this.taskTypes.find((tt) => tt.id == id)!.name;
  }

  getTotalElapsedTime(): void {
    if (this.tasks.length > 0) {
      let timeArr: { hours: number; mins: number; seconds: number; }[] = [];

      this.tasks.forEach(t => {
        let time = {
          hours: 0,
          mins: 0,
          seconds: 0
        };

        let splitElapsedTime = t.elapsedTime.split(':');
        time.hours = parseInt(splitElapsedTime[0]);
        time.mins = parseInt(splitElapsedTime[1]);
        time.seconds = parseInt(splitElapsedTime[2]);
        timeArr.push(time);
      });

      let seconds = timeArr.reduce((a, c) => a + c.seconds, 0);
      let minsToSeconds = timeArr.reduce((a, c) => a + c.mins, 0) * 60;
      let hoursToSeconds = timeArr.reduce((a, c) => a + c.hours, 0) * 3600;

      let totalSeconds = seconds + minsToSeconds + hoursToSeconds;

      let hours = Math.floor(totalSeconds / 3600);
      let mins = Math.floor((totalSeconds / 60) % 60);
      let endSeconds = Math.floor(totalSeconds % 60);

      let result = '';
      if (hours < 10) {
        result += '0' + hours + ':';
      } else {
        result += hours + ':';
      }

      if (mins < 10) {
        result += '0' + mins + ':'
      } else {
        result += mins + ':';
      }

      if (endSeconds < 10) {
        result += '0' + endSeconds;
      } else {
        result += endSeconds;
      }

      this.totalElapsedTime = result;
    }
  }
}
