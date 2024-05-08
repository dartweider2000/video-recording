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
    <video ref="streamVideoEl" class="video" autoplay muted></video>
  </MediaArea>
</template>

<style scoped lang="scss"></style>
