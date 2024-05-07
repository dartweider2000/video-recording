export enum TimerWebWorkerStatus {
  Init = "init",
  Working = "working",
  Pause = "pause",
}

export interface ITimerWorkerData {
  status: TimerWebWorkerStatus;
  milliseconds?: number;
}

export enum Mode {
  Photo = "photo",
  Video = "video",
}

export interface IOption {
  mode: Mode;
  name: string;
}
