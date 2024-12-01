export class ITimeSlot {
  timeSlotId: string;
  taskId: string;
  slotTime: Date;
  taskName: string;

  constructor(timeSlotId: string, taskId: string, slotTime: Date, taskName: string) {
    this.timeSlotId = timeSlotId;
    this.taskId = taskId;
    this.slotTime = slotTime;
    this.taskName = taskName;
  }
}
