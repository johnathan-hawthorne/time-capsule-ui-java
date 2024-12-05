export class ITask {
  id: string;
  name: string;
  taskTypeId: number;
  elapsedTime: string;
  startDateTime: string;
  endDateTime: string;

  constructor(id: string, name: string, taskTypeId: number, elapsedTime: string, startTime: string, endTime: string) {
    this.id = id;
    this.name = name;
    this.taskTypeId = taskTypeId;
    this.elapsedTime = elapsedTime;
    this.startDateTime = startTime;
    this.endDateTime = endTime;
  }
}
