<script setup lang="ts">
  import { useMediaStore } from "@/stores/mediaStore";
  import { storeToRefs } from "pinia";
  import { onMounted, watch } from "vue";
  import MediaArea from "@/components/MediaArea.vue";
  import { useHtmlElementsStore } from "@/stores/htmlElementsStore";

  const { mediaStream, isMediaStreamLoading, originalSize } =
    storeToRefs(useMediaStore());
  const { streamVideoEl } = storeToRefs(useHtmlElementsStore());

  onMounted(() => {
    watch(
      mediaStream,
      () => {
        if (mediaStream.value) {
          streamVideoEl.value!.srcObject = mediaStream.value;

          const { width, height } = mediaStream.value
            .getVideoTracks()[0]
            .getSettings();
          originalSize.value = {
            width: width!,
            height: height!,
          };
        }
      },
      { immediate: true },
    );
  });
</script>

<template>
  <MediaArea :loading="isMediaStreamLoading">
    <video
      v-show="!isMediaStreamLoading"
      ref="streamVideoEl"
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
