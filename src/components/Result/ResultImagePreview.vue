<script setup lang="ts">
  import MediaArea from "@/components/MediaArea.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { ref, watch } from "vue";

  const imageEl = ref<HTMLImageElement | null>(null);
  const { resultBlobUrl } = storeToRefs(useResultStore());

  const loading = ref<boolean>(true);

  watch(
    () => imageEl.value?.complete,
    () => {
      loading.value = !imageEl.value?.complete;
    },
    { immediate: true },
  );
</script>

<template>
  <MediaArea :loading="loading">
    <img
      v-show="loading"
      :src="resultBlobUrl"
      ref="imageEl"
      class="image"
      alt="image-preview"
    />
  </MediaArea>
</template>

<style scoped lang="scss">
  .image {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center;
  }
</style>
