<script setup lang="ts">
  import { useMediaStore } from "@/stores/mediaStore";
  import { storeToRefs } from "pinia";
  import { onMounted, ref, watch } from "vue";
  import MediaArea from "@/components/MediaArea.vue";

  const videoEl = ref<HTMLVideoElement | null>(null);
  const { mediaStream, isMediaStreamLoading } = storeToRefs(useMediaStore());

  onMounted(() => {
    watch(
      mediaStream,
      () => {
        if (mediaStream.value) videoEl.value!.srcObject = mediaStream.value;
      },
      { immediate: true },
    );
  });
</script>

<template>
  <MediaArea :loading="isMediaStreamLoading">
    <video
      v-show="!isMediaStreamLoading"
      ref="videoEl"
      class="video"
      autoplay
      muted
    ></video>
  </MediaArea>
</template>

<style scoped lang="scss">
  .video {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center;
  }
</style>
