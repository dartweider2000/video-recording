<script setup lang="ts">
  import ResultImagePreview from "@/components/Result/ResultImagePreview.vue";
  import ResultVideoPreview from "@/components/Result/ResultVideoPreview.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { Mode } from "@/types";

  const { selectedMode } = storeToRefs(useResultStore());
</script>

<template>
  <div class="result-page">
    <div class="result-page__preview">
      <ResultVideoPreview v-if="selectedMode === Mode.Video" />
      <ResultImagePreview v-else />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
