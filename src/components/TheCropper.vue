<script setup lang="ts">
  import { Cropper, CircleStencil } from "vue-advanced-cropper";
  import MediaArea from "@/components/MediaArea.vue";
  import { onBeforeMount, ref, watch } from "vue";
  import { useResultStore } from "@/stores/resultStore";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { Mode } from "@/types";

  const router = useRouter();
  const { selectedMode, resultBlobUrl } = storeToRefs(useResultStore());

  const loading = ref<boolean>(true);

  const cropperReadyHandler = () => {
    loading.value = false;

    console.log("!!!");
  };

  onBeforeMount(async () => {
    if (selectedMode.value === Mode.Video) {
      await router.replace("/");
    }
  });
</script>

<template>
  <MediaArea :loading="loading">
    <Cropper
      class="cropper"
      :src="resultBlobUrl"
      :auto-zoom="true"
      @ready="cropperReadyHandler"
    />
  </MediaArea>
</template>

<style scoped lang="scss">
  .cropper {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center;
  }
</style>
