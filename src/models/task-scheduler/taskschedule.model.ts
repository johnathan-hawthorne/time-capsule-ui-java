import {ITimeSlot} from "./timeslot.model";

export class ITaskSchedule
{
  scheduleId: string;
  scheduleDate: Date;
  timeSlots: ITimeSlot[];

  constructor(scheduleId: string, scheduleDate: Date, timeSlots: ITimeSlot[]) {
    this.scheduleId = scheduleId;
    this.scheduleDate = scheduleDate;
    this.timeSlots = timeSlots;
  }
}
