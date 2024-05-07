<script setup lang="ts">
  import { useMediaAreaSizes } from "@/composables/useMediaAreaSizes";
  import { useMediaStore } from "@/stores/mediaStore";
  import { ElSkeleton, ElSkeletonItem } from "element-plus";
  import { storeToRefs } from "pinia";
  import { onMounted, ref, watch } from "vue";

  defineProps<{
    loading: boolean;
  }>();

  const videoEl = ref<HTMLVideoElement | null>(null);

  useMediaAreaSizes();
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
  <div class="media-area">
    <ElSkeleton
      class="media-area__skeleton full"
      :loading="isMediaStreamLoading"
      animated
    >
      <template #template>
        <ElSkeletonItem variant="image" style="width: 100%; height: 100%" />
      </template>
    </ElSkeleton>
    <div class="media-area__content full">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .full {
    @apply absolute top-0 left-0 w-full h-full;
  }

  .camera {
    @apply relative w-[--web-capture-width] h-[--web-capture-height] rounded-[20px] overflow-hidden;
    // .camera__skeleton
    &__skeleton {
    }
    // .camera__content
    &__content {
      & > * {
        @apply full;
      }
    }
    // .camera__video
    &__video {
      @apply object-cover object-center;
    }
    // .camera__empty
    &__empty {
    }
  }
</style>
