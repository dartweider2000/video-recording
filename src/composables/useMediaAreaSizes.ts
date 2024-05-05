import { useVariablesStore } from "@/stores/variablesStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, onUnmounted } from "vue";

export const useMediaAreaSizes = () => {
  const {
    webCaptureHeight,
    webCaptureWidth,
    maxContainerWidth,
    containerPadding,
  } = storeToRefs(useVariablesStore());

  const resizeHandler = () => {
    const width = document.documentElement.clientWidth;

    if (width > maxContainerWidth.value + containerPadding.value * 2) {
      webCaptureWidth.value = maxContainerWidth.value;
    } else {
      webCaptureWidth.value = width - containerPadding.value * 2;
    }

    if (width > 500) {
      webCaptureHeight.value = 500;
    } else {
      webCaptureHeight.value = webCaptureWidth.value;
    }
  };

  onBeforeMount(() => {
    resizeHandler();
  });

  onMounted(async () => {
    window.addEventListener("resize", resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });
};
