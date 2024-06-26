import { defineStore, storeToRefs } from "pinia";
import { useHtmlElementsStore } from "@/stores/htmlElementsStore";
import { useResultStore } from "@/stores/resultStore";
import { ref } from "vue";
import { useMediaStore } from "@/stores/mediaStore";
import { useRouter } from "vue-router";
import { getBlobFromCanvas } from "@/helpers/getBlobFromCanvas";

export const useImageModeStore = defineStore("imageModeStore", () => {
  const router = useRouter();

  const { resultBlobUrl } = storeToRefs(useResultStore());
  const { streamVideoEl } = storeToRefs(useHtmlElementsStore());
  const { originalSize } = storeToRefs(useMediaStore());
  const isMakingImage = ref<boolean>(false);

  const makeImage = async () => {
    isMakingImage.value = true;

    const canvas = document.createElement("canvas");
    canvas.width = originalSize.value.width;
    canvas.height = originalSize.value.height;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.drawImage(streamVideoEl.value!, 0, 0, canvas.width, canvas.height);
    const imageBlob = await getBlobFromCanvas(canvas);

    resultBlobUrl.value = URL.createObjectURL(imageBlob);
    await router.push("/result");

    isMakingImage.value = false;
  };

  return {
    isMakingImage,
    makeImage,
  };
});
