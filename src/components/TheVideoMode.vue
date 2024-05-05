<script setup lang="ts">
  import { ElButton, ElIcon } from "element-plus";
  import { ref } from "vue";

  const isRecordingStarted = ref<boolean>(false);
  const isRecondingOnPause = ref<boolean>(false);

  const startButtonClick = () => {
    isRecordingStarted.value = true;
  };

  const pauseButtonClick = () => {
    isRecondingOnPause.value = true;
  };

  const stopButtonClick = () => {
    isRecordingStarted.value = false;
  };
</script>

<template>
  <div class="video-mode">
    <div class="flex flex-wrap gap-[5px]">
      <ElButton
        v-if="!isRecordingStarted"
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
      <ElButton
        v-if="isRecordingStarted"
        type="warning"
        class="basis-[100%] flex-1"
        :disabled="!isRecordingStarted"
        @click="pauseButtonClick"
      >
        <ElIcon class="el-icon--left" :size="20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
          </svg>
        </ElIcon>
        Пауза
      </ElButton>
      <ElButton
        v-if="isRecordingStarted"
        class="basis-[100%] flex-1"
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
</template>

<style scoped lang="scss">
  :deep(.el-button) {
    margin: 0;
    @apply py-[20px];
  }
</style>
