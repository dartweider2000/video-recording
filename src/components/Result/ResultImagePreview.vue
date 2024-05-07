<script setup lang="ts">
  import MediaArea from "@/components/MediaArea.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";

  const imageEl = ref<HTMLImageElement | null>(null);
  const { resultBlobUrl } = storeToRefs(useResultStore());

  const loading = computed(() => !imageEl.value?.complete);
</script>

<template>
  <MediaArea :loading="loading">
    <img
      v-show="!loading"
      :src="resultBlobUrl"
      ref="imageEl"
      class="video"
      alt="image-preview"
    />
  </MediaArea>
</template>

<style scoped lang="scss"></style>
