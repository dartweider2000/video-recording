<script setup lang="ts">
  import { ElButton, ElIcon } from "element-plus";
  import TheTimer from "@/components/TheTimer.vue";
  import { useVideoRecordingStore } from "@/stores/videoRecordingStore";
  import { storeToRefs } from "pinia";

  const store = useVideoRecordingStore();
  const { videoDuration, isRecordingOnPause, isRecordingStarted, isLive } =
    storeToRefs(store);
  const { startRecording, pauseRecording, stopRecording } = store;
</script>

<template>
  <div class="video-mode">
    <div class="flex flex-wrap gap-[5px]">
      <ElButton
        v-show="!isRecordingStarted"
        class="basis-auto flex-1"
        type="success"
        @click="startRecording"
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
        <TheTimer v-model="videoDuration" :tick="isLive" />
        <ElButton
          v-if="isRecordingStarted"
          type="warning"
          :disabled="!isRecordingStarted"
          @click="pauseRecording"
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
          @click="stopRecording"
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

<style scoped lang="scss"></style>
