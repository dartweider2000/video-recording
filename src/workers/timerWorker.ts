import { TimerWebWorkerStatus, type ITimerWorkerData } from "@/types";

let milliseconds: number = 0;
let status: TimerWebWorkerStatus = TimerWebWorkerStatus.Pause;

const interval = 10;

const executeTime = () => {
  if (status === TimerWebWorkerStatus.Pause) return;

  milliseconds += interval;

  const message: ITimerWorkerData = {
    status,
    milliseconds,
  };
  self.postMessage(message);

  setTimeout(executeTime, interval);
};

self.addEventListener("message", ({ data }: MessageEvent) => {
  const { status: _status, milliseconds: ms } = data as ITimerWorkerData;

  if (_status === TimerWebWorkerStatus.Init) {
    milliseconds = ms!;

    status = TimerWebWorkerStatus.Working;
    setTimeout(executeTime, interval);
  } else if (_status === TimerWebWorkerStatus.Pause) {
    status = TimerWebWorkerStatus.Pause;
  }
});
