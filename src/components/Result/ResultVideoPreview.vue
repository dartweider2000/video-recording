<script setup lang="ts">
  import MediaArea from "@/components/MediaArea.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  const videoEl = ref<HTMLVideoElement | null>(null);
  const { resultBlobUrl } = storeToRefs(useResultStore());

  const loading = ref<boolean>(true);

  onMounted(() => {
    videoEl.value?.addEventListener("loadeddata", () => {
      loading.value = false;
    });
  });
</script>

<template>
  <MediaArea :loading="loading">
    <video
      v-show="!loading"
      :src="resultBlobUrl"
      ref="videoEl"
      class="video"
      controls
    ></video>
  </MediaArea>
</template>

<style scoped lang="scss">
  .video {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center;
  }
</style>
