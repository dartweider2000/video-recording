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
      autoplay
      muted
    ></video>
  </MediaArea>
</template>

<style scoped lang="scss"></style>
