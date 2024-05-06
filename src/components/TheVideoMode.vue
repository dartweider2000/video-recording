<script setup lang="ts">
  import { ElButton, ElIcon } from "element-plus";
  import { computed, ref } from "vue";
  import TheTimer from "@/components/TheTimer.vue";

  const isRecordingStarted = ref<boolean>(false);
  const isRecordingOnPause = ref<boolean>(false);
  const stopTimer = ref<boolean>(false);

  const startButtonClick = () => {
    isRecordingStarted.value = true;
  };

  const pauseButtonClick = () => {
    isRecordingOnPause.value = !isRecordingOnPause.value;
  };

  const stopButtonClick = () => {
    isRecordingStarted.value = false;
    isRecordingOnPause.value = false;
    stopTimer.value = true;
  };

  const isTimerTick = computed(
    () => isRecordingStarted.value && !isRecordingOnPause.value,
  );

  const getTimeHandler = (ms: number) => {
    stopTimer.value = false;
    console.log(ms, "res");
  };
</script>

<template>
  <div class="video-mode">
    <div class="flex flex-wrap gap-[5px]">
      <ElButton
        v-show="!isRecordingStarted"
        class="basis-auto flex-1"
        type="success"
        @click="startButtonClick"
      >
        <ElIcon class="el-icon--left" :size="20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M7 6v12l10-6z"></path>
          </svg>
        </ElIcon>
        Начать запись
      </ElButton>
      <div v-show="isRecordingStarted" class="grid flex-1 gap-[5px]">
        <TheTimer
          :tick="isTimerTick"
          :stop-timer="stopTimer"
          @get-time="getTimeHandler"
        />
        <ElButton
          v-if="isRecordingStarted"
          type="warning"
          :disabled="!isRecordingStarted"
          @click="pauseButtonClick"
        >
          <ElIcon class="el-icon--left" :size="20">
            <svg
              v-if="!isRecordingOnPause"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M7 6v12l10-6z"></path>
            </svg>
          </ElIcon>
          {{ !isRecordingOnPause ? "Пауза" : "Продолжить" }}
        </ElButton>
        <ElButton
          v-if="isRecordingStarted"
          type="danger"
          @click="stopButtonClick"
        >
          <ElIcon class="el-icon--left" :size="20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M7 7h10v10H7z"></path>
            </svg>
          </ElIcon>
          Завершить запись
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  :deep(.el-button) {
    margin: 0;
    @apply py-[20px];
  }
</style>
