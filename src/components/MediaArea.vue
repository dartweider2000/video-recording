<script setup lang="ts">
  import { useMediaAreaSizes } from "@/composables/useMediaAreaSizes";
  import { ElSkeleton, ElSkeletonItem } from "element-plus";

  defineProps<{
    loading: boolean;
  }>();

  defineSlots<{
    default: () => any;
  }>();

  useMediaAreaSizes();
</script>

<template>
  <div class="media-area">
    <ElSkeleton
      class="media-area__skeleton full z-10"
      :loading="loading"
      animated
    >
      <template #template>
        <ElSkeletonItem variant="image" style="width: 100%; height: 100%" />
      </template>
    </ElSkeleton>
    <div
      class="media-area__content full"
      :style="{ opacity: loading ? '0' : '1' }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .full {
    @apply absolute top-0 left-0 w-full h-full;
  }

  .media-area {
    @apply relative w-[--web-capture-width] h-[--web-capture-height] rounded-[20px] overflow-hidden;
    // .camera__content
    &__content {
      @apply relative bg-black;
      & > * {
        @apply absolute top-0 left-0 w-full h-full object-contain object-center;
      }
    }
  }
</style>
