<script setup lang="ts">
  import { useMediaAreaSizes } from "@/composables/useMediaAreaSizes";
  import { useMediaStore } from "@/stores/mediaStore";
  import { ElSkeleton, ElSkeletonItem } from "element-plus";
  import { storeToRefs } from "pinia";
  import { onMounted, ref, watch } from "vue";

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
  <div class="camera">
    <ElSkeleton
      class="camera__skeleton full"
      :loading="isMediaStreamLoading"
      animated
    >
      <template #template>
        <ElSkeletonItem variant="image" style="width: 100%; height: 100%" />
      </template>
    </ElSkeleton>
    <video
      v-show="!isMediaStreamLoading"
      ref="videoEl"
      class="camera__video full"
      muted
      autoplay
    ></video>
  </div>
</template>

<style scoped lang="scss">
  .camera {
    @apply relative w-[--web-capture-width] h-[--web-capture-height] rounded-[20px] overflow-hidden;
    // .camera__skeleton
    &__skeleton {
    }
    // .camera__content
    &__content {
    }
    // .camera__video
    &__video {
      @apply object-cover object-center;
    }
    // .camera__empty
    &__empty {
    }
  }

  .full {
    @apply absolute top-0 left-0 w-full h-full;
  }
</style>
