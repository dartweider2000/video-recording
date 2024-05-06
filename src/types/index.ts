export enum TimerWebWorkerStatus {
  Init = "init",
  Working = "working",
  Pause = "pause",
}

export interface ITimerWorkerData {
  status: TimerWebWorkerStatus;
  milliseconds?: number;
}
