<script setup lang="ts">
  import { Cropper, type CropperResult } from "vue-advanced-cropper";
  import MediaArea from "@/components/MediaArea.vue";
  import { onBeforeMount, ref, toRefs, watch } from "vue";
  import { useResultStore } from "@/stores/resultStore";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { Mode } from "@/types";
  import { getBlobFromCanvas } from "@/helpers/getBlobFromCanvas";

  const props = defineProps<{
    toCropp: boolean;
  }>();

  const { toCropp } = toRefs(props);

  const router = useRouter();
  const { selectedMode, resultBlobUrl } = storeToRefs(useResultStore());

  // @ts-ignore
  const cropperEl = ref<Cropper | null>(null);

  const loading = ref<boolean>(true);

  const cropperReadyHandler = () => {
    loading.value = false;
  };

  const croppHandler = async () => {
    const { canvas } = cropperEl.value.getResult() as CropperResult;
    const blob = await getBlobFromCanvas(canvas!);

    URL.revokeObjectURL(resultBlobUrl.value);
    resultBlobUrl.value = URL.createObjectURL(blob);

    await router.replace("/result");
  };

  watch(toCropp, async () => {
    if (!toCropp.value) return;

    await croppHandler();
  });

  onBeforeMount(async () => {
    if (selectedMode.value === Mode.Video) {
      await router.replace("/");
    }
  });
</script>

<template>
  <MediaArea :loading="loading">
    <Cropper
      ref="cropperEl"
      class="cropper"
      :src="resultBlobUrl"
      :auto-zoom="true"
      @ready="cropperReadyHandler"
    />
  </MediaArea>
</template>

<style scoped lang="scss"></style>
