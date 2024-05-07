<script setup lang="ts">
  import { TimerWebWorkerStatus, type ITimerWorkerData } from "@/types";
  import { onBeforeMount, ref, toRefs, watch } from "vue";

  const props = defineProps<{
    tick: boolean;
  }>();

  const totalMilliseconds = defineModel<number>();
  const { tick } = toRefs(props);

  const worker = ref<Worker | null>(null);

  enum Help {
    MillisecondsInHour = 1000 * 60 * 60,
    MillisecondsInMinet = 1000 * 60,
    MillisecondInSecond = 1000,
  }

  const hours = ref<number>(0);
  const minuts = ref<number>(0);
  const seconds = ref<number>(0);
  const milliseconds = ref<number>(0);

  const clear = () => {
    hours.value = 0;
    minuts.value = 0;
    seconds.value = 0;
    milliseconds.value = 0;
  };

  watch(
    totalMilliseconds,
    () => {
      let ms = totalMilliseconds.value!;
      clear();

      if (ms >= Help.MillisecondsInHour) {
        hours.value = ~~(ms / Help.MillisecondsInHour);
        ms -= hours.value * Help.MillisecondsInHour;
      }

      if (ms >= Help.MillisecondsInMinet) {
        minuts.value = ~~(ms / Help.MillisecondsInMinet);
        ms -= minuts.value * Help.MillisecondsInMinet;
      }

      if (ms >= Help.MillisecondInSecond) {
        seconds.value = ~~(ms / Help.MillisecondInSecond);
        ms -= seconds.value * Help.MillisecondInSecond;
      }

      milliseconds.value = ms;
    },
    { immediate: true },
  );

  onBeforeMount(() => {
    worker.value = new Worker(
      new URL("@/workers/timerWorker.ts", import.meta.url),
      { type: "module" },
    );

    worker.value.addEventListener("message", ({ data }: MessageEvent) => {
      const { milliseconds } = data as ITimerWorkerData;
      totalMilliseconds.value = milliseconds!;
    });

    watch(
      tick,
      () => {
        if (tick.value) {
          // Если таймер работает, то мы запускаем его с того времени которое у нас уже есть.
          // Если таймер только что включили, то оно будет 0,
          // а если сняли с паузы, то продолжаем с предыдущего места

          const message: ITimerWorkerData = {
            status: TimerWebWorkerStatus.Init,
            milliseconds: totalMilliseconds.value,
          };
          worker.value!.postMessage(message);
        } else {
          const message: ITimerWorkerData = {
            status: TimerWebWorkerStatus.Pause,
          };
          worker.value!.postMessage(message);
        }
      },
      { immediate: true },
    );
  });

  const convertTimeToPresentableForm = (
    time: number | string,
    necessaryLength: number = 2,
  ) => {
    return time.toString().padStart(necessaryLength, "0");
  };
</script>

<template>
  <div class="timer flex justify-center text-[20px]">
    <div class="">{{ convertTimeToPresentableForm(hours) }}</div>
    <div class="">{{ convertTimeToPresentableForm(minuts) }}</div>
    <div class="">{{ convertTimeToPresentableForm(seconds) }}</div>
    <div class="">
      {{ convertTimeToPresentableForm(milliseconds.toString().slice(0, 2)) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .timer {
    & > *:not(:last-child) {
      @apply pr-[10px] relative;
      &::after {
        content: ":";
        @apply absolute right-0 top-[50%] translate-y-[-50%];
      }
    }

    & > *:not(:first-child) {
      @apply pl-[5px];
    }
  }
</style>
