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

export enum Help {
  MillisecondsInHour = 1000 * 60 * 60,
  MillisecondsInMinutes = 1000 * 60,
  MillisecondInSecond = 1000,
}

export interface IConvertedTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface IResultForm {
  fileName: string;
}

export interface ISize {
  width: number;
  height: number;
}

export type TransitionName = "front" | "back" | "none";
