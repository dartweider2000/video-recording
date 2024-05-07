import { Help, type IConvertedTime } from "@/types";

export const convertUnixTime = (time: number): IConvertedTime => {
  let ms = time;

  const convertedTime: IConvertedTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  };

  if (ms >= Help.MillisecondsInHour) {
    convertedTime.hours = ~~(ms / Help.MillisecondsInHour);
    ms -= convertedTime.hours * Help.MillisecondsInHour;
  }

  if (ms >= Help.MillisecondsInMinutes) {
    convertedTime.minutes = ~~(ms / Help.MillisecondsInMinutes);
    ms -= convertedTime.minutes * Help.MillisecondsInMinutes;
  }

  if (ms >= Help.MillisecondInSecond) {
    convertedTime.seconds = ~~(ms / Help.MillisecondInSecond);
    ms -= convertedTime.seconds * Help.MillisecondInSecond;
  }

  convertedTime.milliseconds = ms;

  return convertedTime;
};
