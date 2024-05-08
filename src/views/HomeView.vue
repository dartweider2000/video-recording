<script setup lang="ts">
  import { ElOption, ElSelect } from "element-plus";
  import TheCamera from "@/components/TheCamera.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import VideoMode from "@/components/Mode/VideoMode.vue";
  import ImageMode from "@/components/Mode/ImageMode.vue";
  import { Mode } from "@/types";
  import { useVideoRecordingStore } from "@/stores/videoRecordingStore";
  import { computed, onMounted } from "vue";
  import { useImageModeStore } from "@/stores/imageModeStore";

  const resultStore = useResultStore();
  const { modeList, selectedMode } = storeToRefs(resultStore);
  const { refreshResult } = resultStore;

  const { isRecordingStarted } = storeToRefs(useVideoRecordingStore());
  const { isMakingImage } = storeToRefs(useImageModeStore());

  const disableSelect = computed(
    () => isRecordingStarted.value || isMakingImage.value,
  );

  onMounted(() => {
    refreshResult();
  });
</script>

<template>
  <div
    class="work-page grid gap-[10px] content-start grid-rows-[auto,auto,1fr]"
  >
    <TheCamera />
    <ElSelect v-model="selectedMode" :disabled="disableSelect">
      <ElOption
        v-for="mode in modeList"
        :key="mode.mode"
        :label="mode.name"
        :value="mode.mode"
      />
    </ElSelect>
    <VideoMode v-if="selectedMode === Mode.Video" />
    <ImageMode v-else />
  </div>
</template>

<style scoped lang="scss"></style>
