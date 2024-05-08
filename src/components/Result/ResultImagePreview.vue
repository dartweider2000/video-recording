<script setup lang="ts">
  import MediaArea from "@/components/MediaArea.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  const imageEl = ref<HTMLImageElement | null>(null);
  const { resultBlobUrl } = storeToRefs(useResultStore());

  const loading = ref<boolean>(true);

  onMounted(() => {
    imageEl.value?.addEventListener("load", () => {
      loading.value = false;
    });
  });
</script>

<template>
  <MediaArea :loading="loading">
    <img :src="resultBlobUrl" ref="imageEl" class="image" alt="image-preview" />
  </MediaArea>
</template>

<style scoped lang="scss"></style>
